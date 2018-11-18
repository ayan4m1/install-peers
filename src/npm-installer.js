import path from 'path';

import Installer from './installer';

export default class NpmInstaller extends Installer {
  get expectedPath() {
    return path.join('bin', 'npm-cli.js');
  }

  get args() {
    return {
      name: 'npm',
      script: path.resolve(this.execPath),
      command: 'install --no-save --no-package-lock'
    };
  }
}
