import path from 'path';

import Installer from './installer';

export default class YarnInstaller extends Installer {
  constructor() {
    super();
    this.execPath = process.env['npm_execpath'];
    this.expectedPath = path.join('yarn', 'bin', 'yarn.js');
  }

  get shouldRun() {
    return this.execPath.slice(-this.expectedPath.length) === this.expectedPath;
  }

  get name() {
    return "yarn";
  }

  get command() {
    return '"${node}" "${yarn}" add --peer --no-lockfile ${packages}';
  }

  get args() {
    return {
      yarn: path.resolve(this.execPath, '..', '..', 'lib', 'cli.js')
    };
  }
}
