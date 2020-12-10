import YAML from 'yaml';
import {Logger} from './logger';
import {getLabel} from './utils';

export const hackyBoolString = "fe6edaed2a: 1f4b9:'b989659b53d86025c";

const simplifyRam = (input: string): string => {
  const units = 'kmgtp';
  const inNum = parseInt(input.match(/^\d+/)?.shift() || '0');
  const inUnit = input.toLowerCase().match(/\D+$/)?.shift()?.trim();
  let num = inNum;
  let unit = inUnit;
  if (!inNum || !inUnit) {
    return input;
  }
  let unitIndex = units.indexOf(inUnit[0]);
  if (unitIndex === -1) {
    return input;
  }
  const divisor = inUnit.endsWith('i') ? 1000 : 1024;

  while (num % divisor === 0) {
    unitIndex++;
    num /= divisor;
  }
  unit =
    units[unitIndex].toUpperCase() +
    (inUnit.length > 1 ? inUnit.substr(1) : '');

  return num + unit;
};

const cleanElem = (log: (s: string) => void) => (elem: any, path: string) => {
  if (
    (/\/(creationtimestamp|subresources|webhooks)$/.test(path) &&
      elem.value === null) ||
    (/\/(subresources|labels|annotations|status|ports)$/.test(path) &&
      (elem.value === null ||
        elem.value.items == null ||
        elem.value.items.length === 0))
  ) {
    log(`Removed: ${path}`);
    return true;
  }
  if (
    ((typeof elem.value.value === 'string' &&
      /^\s*(true|false|on|off|yes|no)\s*$/gi.test(elem.value.value)) ||
      typeof elem.value.value === 'boolean') &&
    (/\/env\/value$/.test(path) || /^\/data\//.test(path))
  ) {
    elem.value.value = elem.value.value.toString() + hackyBoolString; // I gave up, sorry
  }
  if (elem.value.type === 'PLAIN') {
    if (/\/(limits|requests|hard|soft)\/cpu$/.test(path)) {
      if (typeof elem.value.value === 'number') {
        elem.value.value = elem.value.value.toString();
      } else {
        const newVal = elem.value.value.replace(/000m/, '');
        if (elem.value.value !== newVal) {
          log(`Modified: ${path} from "${elem.value.value}" to "${newVal}"`);
          elem.value.value = newVal;
        }
      }
    }
    if (/\/(limits|requests|hard|soft)\/memory$/.test(path)) {
      const newVal = simplifyRam(elem.value.value);
      if (elem.value.value !== newVal) {
        log(`Modified: ${path} from "${elem.value.value}" to "${newVal}"`);
        elem.value.value = newVal;
      }
    }
  }
  return false;
};

const descendInToProps = (
  func: (elem: any, path: string) => boolean,
  elem: any,
  path: string,
  parentNode: any
) => {
  if (!elem) {
    return;
  }
  let curPath = path;
  if (elem.key && elem.key.value) {
    curPath = path + '/' + elem.key.value;
    const remove = func(elem, curPath.toLowerCase().trim());
    if (remove) {
      parentNode.delete(elem.key.value);
      return;
    }
  }
  const children = elem.items || (elem.value && elem.value.items);
  const parent = elem.value || elem;
  if (children) {
    children.map((e: any) => descendInToProps(func, e, curPath, parent));
  }
};

export const removeKustomizeValues = (
  docs: YAML.Document[],
  logger: Logger | undefined
): YAML.Document[] =>
  docs.filter(d => {
    const toRemove =
      d.get('apiVersion') === 'kustomize.config.k8s.io/v1' &&
      d.get('kind') === 'Values';
    if (toRemove) {
      logger?.log(`Removing ${getLabel(d)}`);
    }
    return !toRemove;
  });

const findUnmatchedSecrets = (
  secrets: SecretMeta[],
  patterns: SecretMeta[]
) => {
  const globMatch = (p: string, i: string) =>
    p.indexOf('*') === -1
      ? p === i
      : new RegExp(p.replace(/\*/g, '.*')).test(i);

  const secretPatternMatcher = (s: SecretMeta) => (
    a: SecretMeta | undefined,
    p: SecretMeta | undefined
  ) =>
    a ||
    (p && globMatch(p.name, s.name) && globMatch(p.namespace, s.namespace)
      ? p
      : undefined);
  return secrets.reduce(
    (a, s) => {
      const matchingPattern = (patterns as (SecretMeta | undefined)[]).reduce(
        secretPatternMatcher(s),
        undefined
      );
      if (!matchingPattern) {
        a.unMatchedSecrets.push(s);
      } else {
        a.matchedPatterns.add(
          `${matchingPattern.namespace}/${matchingPattern.name}`
        );
      }
      return a;
    },
    {unMatchedSecrets: [] as SecretMeta[], matchedPatterns: new Set<string>()}
  );
};

export const checkSecrets = (
  docs: YAML.Document[],
  allowedSecrets: SecretMeta[],
  logger: Logger | undefined
) => {
  const secrets = docs
    .filter(d => d.get('kind') === 'Secret')
    .map(s => s.get('metadata'))
    .map(m => ({name: m.get('name'), namespace: m.get('namespace')}));

  logger?.log(
    'Found secrets: ' + secrets.map(s => s.namespace + '/' + s.name).join(', ')
  );
  const {unMatchedSecrets, matchedPatterns} = findUnmatchedSecrets(
    secrets,
    allowedSecrets
  );
  logger?.log(
    "Didn't match any secrets with: " +
      allowedSecrets
        .map(s => s.namespace + '/' + s.name)
        .filter(s => !matchedPatterns.has(s))
        .join(', ')
  );

  if (unMatchedSecrets.length > 0) {
    throw new Error(
      `Invalid secrets: ${unMatchedSecrets
        .map(s => s.namespace + '/' + s.name)
        .join(', ')}`
    );
  }
};

export const cleanUpYaml = (
  doc: YAML.Document,
  logger?: Logger
): {doc: YAML.Document; modified: boolean} => {
  let modified = false;
  descendInToProps(
    cleanElem(s => {
      if (!modified) {
        logger?.log('Processing ' + getLabel(doc));
      }
      modified = true;
      logger?.log(s);
    }),
    doc.contents,
    '',
    doc
  );
  return {doc, modified};
};

export const customValidation = (
  input: string,
  customValidation: {regex: RegExp; expected: boolean; message: string}[],
  logger: Logger | undefined
): string[] => {
  customValidation.forEach(v => {
    logger?.log(
      `Custom validation: ${v.expected ? 'failing to match' : 'matching'} ${
        v.regex
      } will result in ${v.message}`
    );
  });
  const messages = customValidation.map(v => {
    const m = v.regex.exec(input);
    const fail = !!m !== v.expected;
    logger?.log(
      `${v.regex.source}	:${m ? 'Matched' : 'Not matched'}	${
        fail ? 'Fail ' : 'Pass'
      } "${m && m!}"`
    );
    return !fail ? '' : v.message + ((m && '\n' + m.join('\n')) || '');
  });
  return messages.filter(m => m != '');
};

type SecretMeta = {
  namespace: string;
  name: string;
};
