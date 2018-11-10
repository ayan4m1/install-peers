"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _installer = _interopRequireDefault(require("./installer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PNpmInstaller extends _installer.default {
  get expectedPath() {
    return _path.default.join('pnpm', 'bin', 'pnpm.js');
  }

  get args() {
    return {
      name: 'pnpm',
      script: _path.default.resolve(this.execPath, '..', '..', '..', 'pnpm', 'bin', 'pnpm.js'),
      command: 'install --no-lock --no-shrinkwrap'
    };
  }

}

exports.default = PNpmInstaller;