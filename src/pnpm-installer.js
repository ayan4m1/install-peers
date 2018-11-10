import path from 'path';

import Installer from './installer';

export default class PNpmInstaller extends Installer {
  get expectedPath() {
    return path.join('pnpm', 'bin', 'pnpm.js');
  }

  get args() {
    return {
      name: 'pnpm',
      script: path.resolve(this.execPath, '..', '..', '..', 'pnpm' ,'bin', 'pnpm.js'),
      command: 'install --no-lock --no-shrinkwrap'
    };
  }
}
