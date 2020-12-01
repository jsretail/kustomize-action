import core from '@actions/core';
import {buildActionLogger, buildConsoleLogger, Logger} from './logger';
import kustomize from './kustomize';
import {checkSecrets, cleanUpYaml, removeKustomizeValues} from './cleanYaml';
import validateYaml from './validation';
import {
  getSettings,
  Settings,
  validateEnvironment,
  validateSettings
} from './setup';
import {runActions} from './outputs';

const main = async () => {
  const isAction = !!process.env.GITHUB_WORKFLOW;
  const logger = isAction ? buildActionLogger() : buildConsoleLogger();
  if (!isAction) {
    logger.warn(
      'Not running as action because GITHUB_WORKFLOW env var is not set'
    );
  }
  try {
    logger.log('Parsing settings');
    const settings = getSettings(isAction);
    console.log(JSON.stringify(settings, null, 2));
    await validateSettings(settings);
    logger.log('Validating environment (binaries etc)');
    await validateEnvironment(settings.requiredBins);
    const {yaml, errors} = await getYaml(settings, logger);
    await runActions(yaml, errors, settings, logger);
    if (errors.length) {
      throw new Error('Invalid yaml:\n' + errors.join('\n'));
    }
  } catch (error) {
    if (isAction) {
      console.error(error.message, +'a' + core.toString());
    } else {
      console.error(error.message);
    }
  }
};

const getYaml = async (settings: Settings, logger: Logger) => {
  logger.log('Running kustomize');
  const resources = await kustomize(
    settings.kustomizePath,
    settings.extraResources,
    logger,
    settings.verbose
  );
  logger.log('Removing superfluous kustomize resources');
  const docs = removeKustomizeValues(resources);
  logger.log('Cleaning up YAML');
  const cleanedDocs = docs.map(d =>
    cleanUpYaml(d, settings.verbose ? logger : undefined)
  );
  logger.log('Checking for unencrypted secrets');
  checkSecrets(cleanedDocs, settings.allowedSecrets, logger);
  const yaml = cleanedDocs.join(''); // The docs retain their --- when parsed
  const errors = await validateYaml(yaml, logger);

  return {yaml, errors: <string[]>errors.filter(e => e !== undefined)};
};
main();
