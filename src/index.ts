import * as core from '@actions/core';
import YAML from 'yaml';
import {buildActionLogger, buildConsoleLogger, Logger} from './logger';
import kustomize from './kustomize';
import {
  checkSecrets,
  cleanUpYaml,
  customValidation,
  hackyBoolString,
  removeKustomizeValues
} from './cleanYaml';
import validateYaml from './validation';
import {
  getSettings,
  Settings,
  validateEnvironment,
  validateSettings
} from './setup';
import {runActions} from './outputs';
import {getLabel, makeBox} from './utils';
import {Type} from 'yaml/util';
import {resolve} from 'path';
import resourceFilter from './resourceFilter';

const main = async () => {
  const isAction = !!process.env.GITHUB_EVENT_NAME;
  try {
    const settings = getSettings(isAction);
    const logger = isAction
      ? buildActionLogger(settings)
      : buildConsoleLogger(settings);
    if (!isAction) {
      logger.warn(
        'Not running as action because GITHUB_WORKFLOW env var is not set'
      );
    }
    output(logger, settings.verbose, 'Parsing and validating settings');
    if (settings.verbose) {
      console.log(YAML.stringify(settings));
    }
    await validateSettings(settings);
    output(
      logger,
      settings.verbose,
      'Validating environment (binaries, plugin path etc)'
    );
    await validateEnvironment(
      settings.requiredBins,
      settings.verbose ? logger : undefined
    );
    const {yaml, errors} = await getYaml(settings, logger);
    if (settings.outputActions && settings.outputActions.length) {
      output(logger, settings.verbose, 'Running output actions');
      await runActions(yaml, errors, settings, logger);
    }
    if (errors.length) {
      throw new Error('Errored');
    }
    logger.log('Finished');
  } catch (error) {
    const toReport = error.message ? error.message : error.toString();
    if (isAction) {
      core.setFailed(toReport);
    } else {
      console.error(toReport);
      process.exit(1);
    }
  }
};

const output = (logger: Logger, verbose: boolean, msg: string) => {
  if (!verbose) {
    logger.log(msg);
    return;
  }
  logger.log('\n\n' + makeBox(msg));
};

const getYaml = async (settings: Settings, logger: Logger) => {
  const section = async (name: string, fn: () => Promise<unknown>) => {
    if (!settings.verbose) {
      output(logger, false, name);
      return await fn();
    }
    // return core.group(name, async () => {
    output(logger, true, name);
    return await fn();
    //   return await fn();
    // });
  };

  const errors = [] as string[];
  const {docs: resources, warnings} = ((await section(
    'Running kustomize',
    async () => {
      return await kustomize(settings, logger);
    }
  )) as unknown) as {docs: YAML.Document[]; warnings: string[]};

  if (warnings && warnings.length) {
    warnings.forEach(logger.warn);
    if (settings.reportWarningsAsErrors) {
      errors.push(...warnings);
    }
  }

  const docs = ((await section(
    'Removing superfluous kustomize resources',
    async () => {
      return removeKustomizeValues(
        resources,
        settings.verbose ? logger : undefined
      );
    }
  )) as unknown) as YAML.Document[];

  const filteredDocs = ((await section('Filtering Documents', async () => {
    return resourceFilter(docs, settings.verbose ? logger : undefined, {
      filterExcludeAnnotations: settings.filterExcludeAnnotations?.split(','),
      filterExcludeResources: settings.filterExcludeResource?.split(',')
    });
  }) as unknown) as YAML.Document[]);

  const cleanedDocs = ((await section('Cleaning up YAML', async () => {
    const cleaned = filteredDocs.reduce(
      (a, d) => {
        const {doc, modified} = cleanUpYaml(
          d,
          settings.verbose ? logger : undefined
        );
        a.cleanedDocs.push(doc);
        a.modified = a.modified || modified;
        return a;
      },
      {cleanedDocs: <YAML.Document[]>[], modified: false}
    );
    if (!cleaned.modified && settings.verbose) {
      logger.log('No changes required');
    }
    return cleaned.cleanedDocs;
  })) as unknown) as YAML.Document[];

  await section('Checking for un-encrypted secrets', async () => {
    checkSecrets(cleanedDocs, settings.allowedSecrets, logger);
  });

  const yaml = cleanedDocs
    .map(d => {
      if (d.errors.length) {
        console.warn(
          `Document ${getLabel(d)} has errors:\n${YAML.stringify(d.errors)}`
        );
        return `# Document ${getLabel(d)} has errors:\n${YAML.stringify(
          d.errors
        ).replace(/\n/g, '\\n')}`;
      }

      const rx = new RegExp(hackyBoolString.replace(/[^0-9a-z]+/g, '.+'), 'g');
      return YAML.stringify(d).replace(rx, '');
    })
    .join('---\n');
  errors.push(
    ...(cleanedDocs
      .filter(d => d.errors.length)
      .reduce((a, d) => {
        const label = getLabel(d);
        d.errors.forEach(e => {
          a.push(`${label} ${e.linePos} ${e.range}: ${e.message}`);
        });
        return a;
      }, [] as (string | undefined)[])
      .filter(i => i != undefined) as string[])
  );

  if (settings.validateWithKubeVal) {
    await section('Validating YAML', async () =>
      errors.push(
        ...(await validateYaml(yaml, logger, {
          schemaLocation: settings.kubevalSchemaLocation,
          kubernetesVersion: settings.kubevalKubernetesVersion
        }))
      )
    );
  }
  if (settings.customValidation.length) {
    await section('Running customValidation tests', async () => {
      errors.push(
        ...customValidation(
          yaml,
          settings.customValidation,
          settings.verbose ? logger : undefined
        )
      );
    });
  }

  return {
    yaml,
    errors: <string[]>(
      errors.filter(
        e =>
          e !== undefined &&
          (!settings.ignoreWarningsErrorsRegex ||
            !settings.ignoreWarningsErrorsRegex.test(e))
      )
    )
  };
};

main();
