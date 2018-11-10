import path from 'path';

import Installer from './installer';

export default class YarnInstaller extends Installer {
  get expectedPath() {
    return path.join('yarn', 'bin', 'yarn.js');
  }

  get args() {
    return {
      name: 'yarn',
      script: path.resolve(this.execPath, '..', '..', 'lib', 'cli.js'),
      command: "add --peer --no-lockfile"
    };
  }
}
