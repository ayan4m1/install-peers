import fs from 'fs';
import path from 'path';

export default class Resolver {
  constructor(rootPath) {
    this.packageJson = path.resolve(rootPath, 'package.json');
  }

  packages() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.packageJson, 'utf8', (error, content) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          const config = JSON.parse(content);
          const peerDeps = config.peerDependencies || [];

          if (typeof peerDeps !== 'object' || Array.isArray(peerDeps)) {
            reject(new Error(`Did not find a valid peerDependencies object in ${this.packageJson}`));
            return;
          }

          resolve(Object.keys(peerDeps).map((name) => `${name}@${peerDeps[name]}`));
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
}

