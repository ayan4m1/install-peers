"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _installer = _interopRequireDefault(require("./installer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class YarnInstaller extends _installer.default {
  get expectedPath() {
    return _path.default.join('yarn', 'bin', 'yarn.js');
  }

  get args() {
    return {
      name: 'yarn',
      script: _path.default.resolve(this.execPath, '..', '..', 'lib', 'cli.js'),
      command: "add --peer --no-lockfile"
    };
  }

}

exports.default = YarnInstaller;