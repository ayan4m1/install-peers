import executioner from 'executioner';

const errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  shouldNotRun: new TypeError('Install was attempted with an unsuitable tool.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

export default class Installer {
  constructor() {
    if (this.constructor === Installer) {
      throw errors.noInstantiate;
    }

    this.execPath = process.env['npm_execpath'];
  }

  get shouldRun() {
    return this.execPath.slice(-this.expectedPath.length) === this.expectedPath;
  }

  get expectedPath() {
    throw errors.calledSuperMethod;
  }

  get args() {
    throw errors.calledSuperMethod;
  }

  install(packages) {
    if (!this.shouldRun) {
      throw errors.shouldNotRun;
    }

    const options = {
      node: process.argv[0],
      packages: packages.map((pkg) => `"${pkg}"`).join(' '),
      ...this.args
    };

    return new Promise((resolve, reject) => {
      executioner('"${node}" "${script}" ${command} ${packages}', options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}
