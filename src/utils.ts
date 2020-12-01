import fs from 'fs';
import path, {ParsedPath} from 'path';

export const resolveEnvVars = (str: string | undefined) =>
  str
    ? str.replace(
        /(?<!\\)\$([A-Z_]+[A-Z0-9_]*)|(?<!\\)\${([A-Z0-9_]*)}/gi,
        (_, a, b) => process.env[a || b] || ''
      )
    : '';

export const getBinPath = (bin: string): Promise<string | undefined> =>
  new Promise<string | undefined>(res => {
    const possPaths = (process.env.PATH || '')
      .replace(/["]+/g, '')
      .split(path.delimiter)
      .map(p =>
        (process.env.PATHEXT || '')
          .split(path.delimiter)
          .map(ext => path.join(p, bin + ext))
      );

    const paths = ([] as string[]).concat(...possPaths);
    let pathCount = paths.length;
    paths.map(p =>
      fs.exists(p, (exists: boolean) => {
        pathCount--;
        if (exists) {
          return res(p);
        }
        if (pathCount === 0) {
          res(undefined);
        }
      })
    );
  });

export const getWorkspaceRoot = () => {
  const getParentGitDir = (parsed: ParsedPath): string | undefined =>
    fs.existsSync(path.join(parsed.dir, parsed.name, '.git'))
      ? path.join(parsed.dir, parsed.name)
      : (parsed.dir !== parsed.root &&
          getParentGitDir(path.parse(parsed.dir))) ||
        undefined;

  return (
    process.env['GITHUB_WORKSPACE'] ||
    getParentGitDir(path.parse(process.cwd())) ||
    process.cwd()
  );
};
