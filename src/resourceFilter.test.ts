import YAML from 'yaml';
import Sut from './resourceFilter';

describe('Given a single document with no filters', () => {
  const givenDocument = YAML.parseAllDocuments('doc:1');

  it('should return the given document', () => {
    const result = Sut(givenDocument, undefined, {});

    expect(result.toString()).toBe(givenDocument.toString());
  });
});

describe('Given annotation filters', () => {
  it.each([
    {
      givenFilter: ['filter1'],
      givenYaml: YAML.parseAllDocuments(`
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter1
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter2
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter3
`),
      expectedYaml: YAML.parseAllDocuments(`
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter2
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter3`)
    },
    {
      givenFilter: ['filter1', 'filter2'],
      givenYaml: YAML.parseAllDocuments(`
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter1
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter2
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter3
`),
      expectedYaml: YAML.parseAllDocuments(`
---
metadata:
  annotations:
    sainsburys.co.uk/filter: filter3`)
    }
  ])(
    'Matching documents should not pass through',
    ({
      givenFilter,
      givenYaml,
      expectedYaml
    }: {
      givenFilter: string[];
      givenYaml: YAML.Document[];
      expectedYaml: YAML.Document[];
    }) => {
      const result = Sut(givenYaml, undefined, {
        filterExcludeAnnotations: givenFilter
      });
      expect(result.toString()).toBe(expectedYaml.toString());
    }
  );
});

describe('Given resouce filters', () => {
  it.each([
    {
      givenResourceFilters: [
        'apiextensions.k8s.io/v1/CustomResourceDefinition'
      ],
      givenYaml: YAML.parseAllDocuments(` 
kind: CustomResourceDefinition
apiVersion: apiextensions.k8s.io/v1
metadata:
  name: doc1
---
kind: Deployment
apiVersion: apiversion2/v1
metadata:
  name: doc2
---
kind: CronJob
apiVersion: apiVersion3/v1
metadata:
  name: doc3`),
      expectedYaml: YAML.parseAllDocuments(`
---
kind: Deployment
apiVersion: apiversion2/v1
metadata:
  name: doc2
---
kind: CronJob
apiVersion: apiVersion3/v1
metadata:
  name: doc3`)
    },
    {
      givenResourceFilters: [
        'apiextensions.k8s.io/v1/CustomResourceDefinition',
        'apiversion2/v1/Deployment'
      ],
      givenYaml: YAML.parseAllDocuments(` 
kind: CustomResourceDefinition
apiVersion: apiextensions.k8s.io/v1
metadata:
  name: doc1
---
kind: Deployment
apiVersion: apiversion2/v1
metadata:
  name: doc2
---
kind: CronJob
apiVersion: apiVersion3/v1
metadata:
  name: doc3`),
      expectedYaml: YAML.parseAllDocuments(`
---
kind: CronJob
apiVersion: apiVersion3/v1
metadata:
  name: doc3`)
    }
  ])(
    'Matching resouces are not returned',
    ({
      givenResourceFilters,
      givenYaml,
      expectedYaml
    }: {
      givenResourceFilters: string[];
      givenYaml: YAML.Document[];
      expectedYaml: YAML.Document[];
    }) => {
      const result = Sut(givenYaml, undefined, {filterExcludeResources: givenResourceFilters})

      expect(result.toString()).toBe(expectedYaml.toString())
    }
  );
});
