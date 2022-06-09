import YAML from 'yaml';
import {Logger} from './logger';
import {getLabel} from './utils';

export default (
  docs: YAML.Document[],
  logger: Logger | undefined = undefined,
  {
    filterExcludeAnnotations = [],
    filterExcludeResources = []
  }: {filterExcludeAnnotations?: string[] | undefined; filterExcludeResources?: string[] | undefined }
): YAML.Document[] =>
  docs.filter(d => {
    
    const filterAnnotation = d.get('metadata')?.get('annotations')?.get('sainsburys.co.uk/filter')
    const kind = d.get('kind') || ""
    const apiVersion = d.get('apiVersion') || ""

    const toRemove = filterExcludeAnnotations.includes(filterAnnotation)
      || filterExcludeResources.includes(`${apiVersion}/${kind}`)

    if (toRemove) {
      logger?.log(`removing ${getLabel(d)}`);
    }

    return !toRemove;
  });
