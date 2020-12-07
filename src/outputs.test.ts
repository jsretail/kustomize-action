import * as core from '@actions/core';
import * as github from '@actions/github';
import * as artifact from '@actions/artifact';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import {buildTestLogger, Logger} from './logger';
import {
  OutputAction,
  LoggerOutputAction,
  runActions,
  VariableOutputAction,
  FileOutputAction,
  parseActions,
  ArtifactOutputAction
} from './outputs';
import {defaultKustomizeArgs, Settings} from './setup';
import {mockedCwd} from './utils';
import {stringify} from 'querystring';

describe('output actions', () => {
  const testSettings: Settings = {
    kustomizePath: '',
    allowedSecrets: [],
    verbose: true,
    outputActions: [],
    extraResources: [],
    customValidation: [],
    requiredBins: [],
    kustomizeArgs: defaultKustomizeArgs,
    validateWithKubeVal: true,
    reportWarningsAsErrors: false,
    ignoreWarningsErrorsRegex: undefined
  };
  const testYaml = `
foo: bar
---
foo:
  bar:
  - foo
  - bar
  - baz`;
  const testErrors: string[] = [];
  describe('LoggerOutputAction', () => {
    test('logs output', async () => {
      const logs: string[] = [];
      const logger = buildTestLogger(testSettings, logs);
      const action = new LoggerOutputAction();

      await action.invoke(testYaml, testErrors, testSettings, logger);
      expect(logs).toEqual([testYaml]);
    });
    test('logs errors', async () => {
      const errors: string[] = [];
      const logger = buildTestLogger(testSettings, [], [], errors);
      const action = new LoggerOutputAction();
      const errs = ['bang', 'kaboom'];
      await action.invoke(testYaml, errs, testSettings, logger);
      expect(errors).toEqual(errs);
    });
  });
  describe('VariableOutputAction', () => {
    test('writes output to variable', async () => {
      const {outputVars} = mockGitHub();
      const action = new VariableOutputAction();
      action.outputVariableName = 'foo';
      action.errorsVariableName = undefined;
      await action.invoke(
        testYaml,
        testErrors,
        testSettings,
        buildTestLogger(testSettings)
      );
      expect(outputVars).toEqual({foo: testYaml});
    });
    test('writes errors to variable', async () => {
      const {outputVars} = mockGitHub();
      const action = new VariableOutputAction();
      action.outputVariableName = 'foo';
      action.errorsVariableName = 'errors';
      const errs = ['bang'];
      await action.invoke(
        testYaml,
        errs,
        testSettings,
        buildTestLogger(testSettings)
      );
      expect(outputVars['errors']).toEqual(errs);
    });
  });

  describe('ArtifactOutputAction', () => {
    const uploaded = [] as {
      name: string;
      files: string[];
      rootDirectory: string;
    }[];
    mockArtifactClient(uploaded);

    test('uploads artifact', async () => {
      const action = new ArtifactOutputAction();

      action.name = 'foo';
      action.yamlFileName = 'bar';
      action.errorsFileName = 'baz';
      await action.invoke(
        testYaml,
        testErrors,
        testSettings,
        buildTestLogger(testSettings)
      );
      expect(uploaded).toHaveLength(1);
      expect(uploaded[0].name).toEqual(action.name);
      const files = uploaded[0].files.map(p => path.basename(p));
      expect(files).not.toEqual(uploaded[0].files);
      expect(files).toContain(action.errorsFileName);
      expect(files).toContain(action.yamlFileName);
    });
  });

  describe('FileOutputAction', () => {
    test('writes to file', async () => {
      const action = new FileOutputAction();
      action.createDirIfMissing = true;
      action.fileOpenFlags = 'w';
      const tmpFileYaml = tmp.tmpNameSync({
        template: '/tmp/test-XXXXXXXXXX/foo/bar/baz'
      });
      const tmpFileErrors = tmp.tmpNameSync({
        template: '/tmp/test-XXXXXXXXXX/foo/bar/baz'
      });

      action.yamlFileName = tmpFileYaml;
      action.errorsFileName = tmpFileErrors;
      await action.invoke(
        testYaml,
        testErrors,
        testSettings,
        buildTestLogger(testSettings)
      );
      expect(fs.readFileSync(tmpFileYaml).toString()).toEqual(testYaml);
      expect(JSON.parse(fs.readFileSync(tmpFileErrors).toString())).toEqual(
        testErrors
      );
    });

    test('writes to relative path', async () => {
      const action = new FileOutputAction();
      action.createDirIfMissing = true;
      action.fileOpenFlags = 'w';
      const tmpDir = tmp.dirSync({
        unsafeCleanup: true,
        keep: true
      });
      try {
        const tmpPath = path.join(tmpDir.name, '/root/foo-XXXXX/bar/baz');
        fs.mkdirSync(path.join(tmpDir.name, 'root', '.git'), {
          recursive: true
        });
        fs.mkdirSync(path.dirname(tmpPath), {recursive: true});
        action.yamlFileName = '.' + tmpPath.substr(tmpPath.indexOf('/foo-'));
        mockedCwd(path.dirname(tmpPath));
        try {
          if (process.env['GITHUB_WORKSPACE']) {
            delete process.env['GITHUB_WORKSPACE'];
          }
          await action.invoke(
            testYaml,
            testErrors,
            testSettings,
            buildTestLogger(testSettings)
          );
        } finally {
          mockedCwd(__dirname);
        }
        expect(fs.readFileSync(tmpPath).toString()).toEqual(testYaml);
      } finally {
        tmpDir.removeCallback();
      }
    });

    test('appends to file', async () => {
      const action = new FileOutputAction();
      action.createDirIfMissing = true;
      action.fileOpenFlags = 'a';
      const tmpFile = tmp.tmpNameSync({
        template: '/tmp/test-XXXXXXXXXX/foo/bar/baz'
      });
      expect(fs.existsSync(path.join(tmpFile, '..', '..'))).toBeFalsy();
      action.yamlFileName = tmpFile;
      await action.invoke(
        testYaml,
        testErrors,
        testSettings,
        buildTestLogger(testSettings)
      );
      await action.invoke(
        testYaml,
        testErrors,
        testSettings,
        buildTestLogger(testSettings)
      );
      expect(fs.readFileSync(tmpFile).toString()).toEqual(testYaml + testYaml);
    });
    test('throws if dir is missing', async () => {
      const action = new FileOutputAction();
      action.createDirIfMissing = false;
      const tmpFile = tmp.tmpNameSync({
        template: '/tmp/test-XXXXXXXXXX/foo/bar/baz'
      });
      expect(fs.existsSync(path.join(tmpFile, '..', '..'))).toBeFalsy();
      action.yamlFileName = tmpFile;
      const err = await new Promise<any>(res => {
        action
          .invoke(
            testYaml,
            testErrors,
            testSettings,
            buildTestLogger(testSettings)
          )
          .catch(e => {
            res(e);
          })
          .then(x => {
            res(x);
          });
      });
      expect(err).toBeDefined();
      expect(fs.existsSync(tmpFile)).toBeFalsy();
    });
  });
  test('Runs output actions synchronously', async () => {
    const logs: string[] = [];
    const testLogger = buildTestLogger(testSettings, logs);

    class TestOutputAction implements OutputAction {
      type: string = 'TestOutputAction';
      name: string;
      delayMs: number;
      constructor(name: string, delayMs: number) {
        this.name = name;
        this.delayMs = delayMs;
      }
      invoke(
        yaml: string,
        errors: string[],
        settings: Settings,
        logger: Logger
      ) {
        return new Promise<void>(res => {
          setTimeout(() => {
            expect(yaml).toBe(testYaml);
            expect(errors).toBe(testErrors);
            expect(settings).toBe(settingsWithTestActions);
            expect(logger).toBe(testLogger);
            logger.log(this.name);
            res();
          }, this.delayMs);
        });
      }
    }
    const settingsWithTestActions = Object.assign({}, testSettings, {
      outputActions: [
        new TestOutputAction('logger A', 100),
        new TestOutputAction('logger B', 10),
        new TestOutputAction('logger C', 50)
      ]
    });

    await runActions(testYaml, testErrors, settingsWithTestActions, testLogger);
    const verboseMsg = 'Invoking TestOutputAction';
    expect(logs).toEqual([
      verboseMsg,
      'logger A',
      verboseMsg,
      'logger B',
      verboseMsg,
      'logger C'
    ]);
    expect.assertions(4 * settingsWithTestActions.outputActions.length + 1);
  });
});
describe('parseActions', () => {
  const variableAction = new VariableOutputAction();
  variableAction.errorsVariableName = 'errors';
  variableAction.outputVariableName = 'output';
  const loggerAction = new LoggerOutputAction();
  loggerAction.logErrors = true;
  loggerAction.logYaml = false;
  const fileAction = new FileOutputAction();
  fileAction.yamlFileName = '/tmp/output';
  fileAction.errorsFileName = '/tmp/errors';
  const artifactAction = new ArtifactOutputAction();
  artifactAction.yamlFileName = 'output';
  artifactAction.errorsFileName = 'errors';
  artifactAction.name = 'my-artifact';

  const actions: OutputAction[] = [
    loggerAction,
    variableAction,
    fileAction,
    artifactAction
  ];
  const json =
    '[{"type":"LoggerOutputAction","logErrors":true,"logYaml":false},{"type":"VariableOutputAction","outputVariableName":"output","errorsVariableName":"errors"},{"type":"FileOutputAction","createDirIfMissing":true,"fileOpenFlags":"w","yamlFileName":"/tmp/output","errorsFileName":"/tmp/errors"},{"type":"ArtifactOutputAction","name":"my-artifact","yamlFileName":"output","errorsFileName":"errors"}]';
  test('parses actions', () => {
    const result = parseActions(json);
    expect(result).toEqual(actions);
  });
  test('throws on error', () => {
    const actions: any[] = JSON.parse(json);
    expect(() =>
      parseActions(JSON.stringify(actions.concat({type: 'foo'})))
    ).toThrow();
  });
});

function mockGitHub() {
  jest.spyOn(github.context, 'repo', 'get').mockImplementation(() => {
    return {
      owner: 'some-owner',
      repo: 'some-repo'
    };
  });
  github.context.ref = 'refs/heads/some-ref';
  github.context.sha = '1234567890123456789012345678901234567890';
  const outputVars: any = {};
  jest.spyOn(core, 'setOutput').mockImplementation((name: string, val: any) => {
    outputVars[name] = val;
  });
  return {outputVars};
}

function mockArtifactClient(
  uploaded: {
    name: string;
    files: string[];
    rootDirectory: string;
  }[]
) {
  jest.spyOn(artifact, 'create').mockImplementation(() => ({
    uploadArtifact: (name, files, rootDirectory, options) => {
      uploaded.push({name, files, rootDirectory});
      return new Promise<artifact.UploadResponse>(res =>
        res({
          artifactName: name,
          artifactItems: files,
          size: 0,
          failedItems: []
        })
      );
    },
    downloadAllArtifacts: (path?: string) => Promise.reject('not implemented'),
    downloadArtifact: (
      name: string,
      path?: string,
      options?: artifact.DownloadOptions
    ) => Promise.reject('not implemented')
  }));
}
