import Q from 'q';
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

    if (this.shouldRun === Installer.prototype.shouldRun ||
      this.command === Installer.prototype.command ||
      this.args === Installer.prototype.args ||
      this.name === Installer.prototype.name) {
      throw errors.missingMethods;
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

  install(packages) {
    if (!shouldRun) {
      return;
    }

    console.dir(this.args);
    console.dir(this.command);

    const installed = Q.defer();
    const options = {
      node: process.argv[0],
      command: this.command,
      packages: packages.map((pkg) => `"${pkg}"`).join(' '),
      ...this.args
    };

    console.dir(options);

    executioner(this.command, options, (error, result) => {
      if (error) {
        installed.reject(error);
        return;
      }

      installed.resolve(result);
    });

    return installed.promise;
  }
}
