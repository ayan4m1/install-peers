import path from 'path';

import Installer from './Installer';

export default class NpmInstaller extends Installer {
  constructor() {
    super();
    this.execPath = process.env['npm_execpath'];
    this.expectedPath = path.join('bin', 'npm-cli.js');
  }

  get shouldRun() {
    return this.execPath.slice(-this.expectedPath.length) === this.expectedPath;
  }

  get name() {
    return "npm";
  }

  get command() {
    return '"${node}" "${npm}" install --no-save --no-package-lock ${packages}';
  }

  get args() {
    return {
      npm: path.resolve(this.execPath)
    };
  }
}

