import fs from 'fs';
import path from 'path';

const errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  missingMethods: new TypeError('This class does not implement the required methods.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

export default class Analyzer {
  constructor() {
    if (this.constructor === Analyzer) {
      throw errors.noInstantiate;
    }

    if (this.packages === Analyzer.prototype.packages) {
      throw errors.missingMethods;
    }
  }

  get packages() {
    throw errors.calledSuperMethod;
  }
}

