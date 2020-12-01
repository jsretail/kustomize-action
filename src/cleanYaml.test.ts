import YAML from 'yaml';
import {cleanUpYaml, removeKustomizeValues, checkSecrets} from './cleanYaml';
import {buildTestLogger} from './logger';
import {parseAllowedSecrets} from './setup';

const createSecret = (ns: string, name: string) =>
  YAML.parseDocument(`
kind: Secret
apiVersion: v1
metadata:
  name: ${name}
  namespace: ${ns}
data:`);

const dirtyYaml = `kind: Deployment
apiVersion: apps/v1
metadata:
  name: foo
  namespace: bar
  creationtimestamp:
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
      annotations: null
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
              cpu: 2000m
              memory: 2000Mi
            requests:
              cpu: 1
              memory: 1024M
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      restartPolicy: Always
      terminationGracePeriodSeconds: 30
      dnsPolicy: ClusterFirst
      securityContext: {}`;

const cleanYaml = `kind: Deployment
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

const valuesYaml = `apiVersion: kustomize.config.k8s.io/v1
kind: Values
metadata:
  name: test
spec:
  foo: bar`;

describe('cleanYaml', () => {
  test('cleans up YAML', () => {
    const input = YAML.parseDocument(dirtyYaml);
    const result = cleanUpYaml(input);
    expect(result.toString()).toEqual(YAML.parseDocument(cleanYaml).toString());
  });
  test('removeKustomizeValues removes "kind: Values" documents', () => {
    const input = [
      YAML.parseDocument(cleanYaml),
      YAML.parseDocument(valuesYaml)
    ];
    const result = removeKustomizeValues(input);
    expect(result).toHaveLength(1);
    expect(result[0].toString()).toEqual(
      YAML.parseDocument(cleanYaml).toString()
    );
  });

  test('checkYamlForSecrets', () => {
    const logs: string[] = [];
    const logger = buildTestLogger(logs);
    const logMsg = "Didn't find allowed secrets: default/foo";
    expect(() =>
      checkSecrets(
        [YAML.parseDocument(cleanYaml)],
        parseAllowedSecrets('default/foo'),
        logger
      )
    ).not.toThrow();
    expect(logs).toContain(logMsg);
    expect(() =>
      checkSecrets(
        [createSecret('default', 'foo')],
        parseAllowedSecrets('default/foo'),
        logger
      )
    ).not.toThrow();
    expect(logs.indexOf(logMsg)).toEqual(logs.lastIndexOf(logMsg));
    expect(() =>
      checkSecrets([createSecret('default', 'foo')], [], logger)
    ).toThrow();
    expect(() =>
      checkSecrets(
        [createSecret('default', 'foo'), createSecret('default2', 'foo')],
        parseAllowedSecrets('default/foo'),
        logger
      )
    ).toThrow();
    expect(() =>
      checkSecrets(
        [createSecret('default', 'foo'), createSecret('default', 'bar')],
        parseAllowedSecrets('default/foo'),
        logger
      )
    ).toThrow();
  });
});
