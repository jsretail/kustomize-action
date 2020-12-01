import fs from 'fs';
import path from 'path';

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
