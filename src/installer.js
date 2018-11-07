import executioner from 'executioner';

const errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  missingMethods: new TypeError('This class does not implement the required methods.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

export default class Installer {
  constructor() {
    if (this.constructor === Installer) {
      throw errors.noInstantiate;
    }
  }

  get shouldRun() {
    throw errors.calledSuperMethod;
  }

  get name() {
    throw errors.calledSuperMethod;
  }

  get command() {
    throw errors.calledSuperMethod;
  }

  get args() {
    throw errors.calledSuperMethod;
  }

  async install() {
    if (!this.shouldRun) {
      return;
    }

    // todo: get packages from analyzer
    const packages = ['react-dom'];
    const options = {
      node: process.argv[0],
      packages: packages.map((pkg) => `"${pkg}"`).join(' '),
      ...this.args
    };

    return new Promise((resolve, reject) => {
      executioner(this.command, options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}
