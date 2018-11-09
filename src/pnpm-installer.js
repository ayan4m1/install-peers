import path from 'path';

import Installer from './installer';

export default class PNpmInstaller extends Installer {
  constructor() {
    super();
    this.execPath = process.env['npm_execpath'];
    this.expectedPath = path.join('pnpm', 'bin', 'pnpm.js');
  }

  get shouldRun() {
    return this.execPath.slice(-this.expectedPath.length) === this.expectedPath;
  }

  get name() {
    return 'pnpm';
  }

  get command() {
    return '"${node}" "${pnpm}" install --no-lock --reporter append-only ${packages}';
  }

  get args() {
    console.error(path.resolve(this.execPath, '..', '..', '..', 'lib', 'pnpm' ,'bin', 'pnpm.js'));
    process.exit(100);
    return {
      pnpm: path.resolve(this.execPath, '..', '..', '..', 'lib', 'pnpm' ,'bin', 'pnpm.js')
    };
  }
}
