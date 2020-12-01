import {execSync} from 'child_process';
import tmp = require('tmp');
import path from 'path';
import validate from './index';
import {getBinPath} from '../utils';
import {Logger, buildTestLogger} from '../logger';

const deployment = `kind: Deployment
apiVersion: apps/v1
metadata:
  name: foo
  namespace: bar
  labels:
    resource-type: application
spec:
  replicas: 2
  selector:
    matchLabels:
      resource-type: application
  template:
    metadata:
      labels:
        resource-type: application
    spec:
      volumes:
        - name: tmp
          emptyDir: {}
      containers:
        - name: app
          image: 'nginx'
          ports:
            - containerPort: 5000
              protocol: TCP
          env:
            - name: foo
              value: 'bar'
          resources:
            limits:
              cpu: "2"
              memory: 2Gi
            requests:
              cpu: "1"
              memory: 1G
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
      dnsPolicy: ClusterFirst
      securityContext: {}`;

const azureIdentity = `
apiVersion: aadpodidentity.k8s.io/v1
kind: AzureIdentity
metadata:
  name: test-identity
  annotations:
    aadpodidentity.k8s.io/Behavior: namespaced
spec:
  clientID: 4e8f72a4-b6ba-4028-8635-7f6089f4e48a
  resourceID: /subscriptions/4e8f72a4-b6ba-4028-8635-7f6089f4e48a/resourceGroups/rg-test/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity
  type: 0`;

describe('validation', () => {
  let tmpDir: string, kPath: string | undefined;
  const cleanup: (() => void)[] = [];
  let logger:Logger, loggerErrors:(string|Error)[];
  const cleanUpGetName = (
    toCleanup: tmp.FileResult | tmp.DirResult
  ): string => {
    cleanup.push(() => toCleanup.removeCallback());
    return toCleanup.name;
  };
  beforeEach(() => {
    loggerErrors = [];
    logger = buildTestLogger([], [], loggerErrors);
  });
  afterAll(() => {
    cleanup.forEach(f => f());
  });

  beforeAll(async () => {
    tmpDir = cleanUpGetName(tmp.dirSync({unsafeCleanup: true, keep: true}));
    kPath = await getBinPath('kubeval');
    if (!kPath) {
      downloadKubevalBin(tmpDir);
      kPath = path.join(tmpDir, 'kubeval');
    }
  });
  test('Passes on valid deployment definition', async () => {
    const errors = await validate(deployment, logger, kPath);
    expect(errors).toHaveLength(0);
    expect(loggerErrors).toHaveLength(0);
  });

  test('Passes on valid CRD definition', async () => {
    const errors = await validate(azureIdentity, logger, kPath);
    expect(errors).toHaveLength(0);
    expect(loggerErrors).toHaveLength(0);
  });
  test('Fails on invalid deployment definition', async () => {
    const errors = await validate(
      deployment.replace('metadata', 'sandwiches'),
      logger,
      kPath
    );
    expect(errors).toHaveLength(1);
    expect(loggerErrors).toHaveLength(2);
  });

  test('Fails on invalid CRD definition', async () => {
    const errors = await validate(
      azureIdentity
        .replace('clientID', 'bacon')
        .replace('resourceID', 'lettuce')
        .replace('type: 0', 'type: tomato'),
      logger,
      kPath
    );
    expect(errors).toHaveLength(3);
    expect(loggerErrors).toHaveLength(4);
  });
});

const downloadKubevalBin = (dir: string) => {
  const url =
    'https://github.com/instrumenta/kubeval/releases/download/0.15.0/kubeval-linux-amd64.tar.gz';
  execSync(`curl -Lo ${dir}/kubeval.tgz '${url}'`);
  execSync(`tar xzf ${dir}/kubeval.tgz -C ${dir}`);
};
