import * as core from '@actions/core';
import * as artifact from '@actions/artifact';
import path from 'path';
import tmp from 'tmp';
import {createWriteStream, promises} from 'fs';
import {Logger} from './logger';
import {Settings} from './setup';
import {getWorkspaceRoot, resolveEnvVars} from './utils';

const osTmpDir = process.env['RUNNER_TEMP'] || tmp.tmpdir;
export interface OutputAction {
  type: string;
  invoke: (
    yaml: string,
    errors: string[],
    settings: Settings,
    logger: Logger
  ) => Promise<void>;
}

export class LoggerOutputAction implements OutputAction {
  type: string = 'LoggerOutputAction';
  logErrors: boolean = true;
  logYaml: boolean = true;
  invoke(yaml: string, errors: string[], settings: Settings, logger: Logger) {
    if (this.logYaml) {
      logger.log(yaml);
    }
    if (this.logErrors) {
      errors.forEach(logger.error);
    }
    return Promise.resolve();
  }
}

export class VariableOutputAction implements OutputAction {
  type: string = 'VariableOutputAction';
  outputVariableName: string | undefined = 'output';
  errorsVariableName: string | undefined = 'errors';

  invoke(yaml: string, errors: string[], settings: Settings, logger: Logger) {
    if (this.outputVariableName) {
      core.setOutput(this.outputVariableName, yaml);
      if (settings.verbose) {
        logger.log(`Wrote ${yaml.length} chars to ${this.outputVariableName}`);
      }
    }
    if (this.errorsVariableName) {
      core.setOutput(this.errorsVariableName, errors);
      if (settings.verbose) {
        logger.log(
          `Wrote ${errors.length} errors to ${this.errorsVariableName}`
        );
      }
    }
    return Promise.resolve();
  }
}

export class FileOutputAction implements OutputAction {
  type: string = 'FileOutputAction';
  yamlFileName: string | undefined;
  errorsFileName: string | undefined;
  createDirIfMissing: boolean = true;
  fileOpenFlags: string = 'w';
  writeToFile(fileName: string, content: string, logger: Logger | undefined) {
    return new Promise<void>((res, rej) => {
      const str = createWriteStream(fileName, {
        flags: this.fileOpenFlags,
        autoClose: true
      });
      str.on('error', rej);
      str.write(content, err =>
        err
          ? rej(err)
          : str.end(() => {
              logger?.log(`Wrote ${content.length} chars to file ${fileName}`);
              res();
            })
      );
    });
  }
  output(fileName: string, content: string, logger: Logger | undefined) {
    if (this.createDirIfMissing) {
      return promises
        .mkdir(path.dirname(fileName), {recursive: true})
        .then(() => this.writeToFile(fileName, content, logger));
    }
    return this.writeToFile(fileName, content, logger);
  }
  invoke(yaml: string, errors: string[], settings: Settings, logger: Logger) {
    const workspaceDir = getWorkspaceRoot();
    const getPath = (p: string) =>
      path.isAbsolute(p) ? p : path.join(workspaceDir, p);

    const l = settings.verbose ? logger : undefined;

    const promises = [Promise.resolve()];
    if (this.yamlFileName) {
      promises.push(
        this.output(getPath(resolveEnvVars(this.yamlFileName)), yaml, l)
      );
    }
    if (this.errorsFileName) {
      const content = JSON.stringify(errors, null, 2);
      promises.push(
        this.output(getPath(resolveEnvVars(this.errorsFileName)), content, l)
      );
    }
    return Promise.all(promises).then(() => Promise.resolve());
  }
}

export const runActions = async (
  yaml: string,
  errors: string[],
  settings: Settings,
  logger: Logger
) => {
  const actions = settings.outputActions;
  for (let i = 0; i < actions.length; i++) {
    if (settings.verbose) {
      logger.log('Invoking ' + actions[i].type);
    }
    await actions[i].invoke(yaml, errors, settings, logger);
  }
};

export const parseActions = (
  json: string,
  typeMappings?: any
): OutputAction[] => {
  const types = typeMappings || {
    LoggerOutputAction: LoggerOutputAction,
    VariableOutputAction: VariableOutputAction,
    FileOutputAction: FileOutputAction,
    ArtifactOutputAction: ArtifactOutputAction
  };
  const actions: Array<OutputAction> = JSON.parse(json).map((i: any) => {
    if (Object.keys(types).indexOf(i.type) === -1) {
      throw new Error('cant find output action ' + i.type);
    }

    const target: any = new types[i.type]();
    for (const key in i) {
      target[key] = i[key];
    }
    return target;
  });
  return actions;
};

export class ArtifactOutputAction implements OutputAction {
  type: string = 'ArtifactOutputAction';
  name: string = 'kustomize-output';
  yamlFileName: string | undefined;
  errorsFileName: string | undefined;
  async invoke(
    yaml: string,
    errors: string[],
    settings: Settings,
    logger: Logger
  ) {
    const {tmpDir, cleanup} = await new Promise((res, rej) =>
      tmp.dir(
        {tmpdir: osTmpDir, keep: true, unsafeCleanup: true},
        (err, tmpDir, cleanup) => (err ? rej(err) : res({tmpDir, cleanup}))
      )
    );
    const fileAction = new FileOutputAction();
    const files = [] as string[];
    if (this.yamlFileName) {
      fileAction.yamlFileName = path.join(tmpDir, this.yamlFileName);
      files.push(fileAction.yamlFileName);
    }
    if (this.errorsFileName) {
      fileAction.errorsFileName = path.join(tmpDir, this.errorsFileName);
      files.push(fileAction.errorsFileName);
    }
    await fileAction.invoke(yaml, errors, settings, logger);
    const client = artifact.create();
    await client.uploadArtifact(this.name, files, tmpDir);
    cleanup();
  }
}
