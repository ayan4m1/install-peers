"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _executioner = _interopRequireDefault(require("executioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const errors = {
  noInstantiate: new TypeError('This class should not be instantiated.'),
  shouldNotRun: new TypeError('Install was attempted with an unsuitable tool.'),
  calledSuperMethod: new TypeError('This method has not been overridden by the child class.')
};

class Installer {
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

    const options = _objectSpread({
      node: process.argv[0],
      packages: packages.map(pkg => `"${pkg}"`).join(' ')
    }, this.args);

    return new Promise((resolve, reject) => {
      (0, _executioner.default)('"${node}" "${script}" ${command} ${packages}', options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }

}

exports.default = Installer;