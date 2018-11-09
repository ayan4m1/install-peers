const errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  missingMethods: new TypeError('This class does not implement the required methods.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

export default class Resolver {
  constructor() {
    if (this.constructor === Resolver) {
      throw errors.noInstantiate;
    }

    if (this.packages === Resolver.prototype.packages) {
      throw errors.missingMethods;
    }
  }

  packages() {
    throw errors.calledSuperMethod;
  }
}

