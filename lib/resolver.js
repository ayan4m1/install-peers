"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Resolver {
  constructor(rootPath) {
    this.packageJson = _path.default.resolve(rootPath, 'package.json');
  }

  packages() {
    return new Promise((resolve, reject) => {
      _fs.default.readFile(this.packageJson, 'utf8', (error, content) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          const config = JSON.parse(content);
          const peerDeps = config.peerDependencies || [];

          if (typeof peerDeps !== 'object' || Array.isArray(peerDeps)) {
            reject(new Error(`Did not find a valid peerDependencies object in ${this.packageJson}`));
            return;
          }

          resolve(Object.keys(peerDeps).map(name => `${name}@${peerDeps[name]}`));
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }

}

exports.default = Resolver;