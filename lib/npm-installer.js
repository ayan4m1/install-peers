"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _Installer = _interopRequireDefault(require("./Installer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NpmInstaller extends _Installer.default {
  get expectedPath() {
    return _path.default.join('bin', 'npm-cli.js');
  }

  get args() {
    return {
      name: 'npm',
      script: _path.default.resolve(this.execPath),
      command: 'install --no-save --no-package-lock'
    };
  }

}

exports.default = NpmInstaller;