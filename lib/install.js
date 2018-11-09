"use strict";

var _path = _interopRequireDefault(require("path"));

var _locker = _interopRequireDefault(require("./locker"));

var _npmInstaller = _interopRequireDefault(require("./npm-installer"));

var _yarnInstaller = _interopRequireDefault(require("./yarn-installer"));

var _pnpmInstaller = _interopRequireDefault(require("./pnpm-installer"));

var _peerResolver = _interopRequireDefault(require("./peer-resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'production') {
  console.log('Skipping peer dependency installation!');
  process.exit(0);
}

if (!_locker.default.claim()) {
  console.dir('Skipping peer dependency installation as it is already running!');
  process.exit(0);
}

var rootPath = process.env.INIT_CWD || _path.default.resolve(process.cwd(), '..', '..'); // in npm@3+ preinstall happens in `node_modules/.staging` folder
// so if we end up in `node_modules/` jump one level up


if (_path.default.basename(rootPath) === 'node_modules') {
  rootPath = _path.default.resolve(rootPath, '..');
}

var resolver = new _peerResolver.default(rootPath);
var installers = [new _npmInstaller.default(), new _yarnInstaller.default(), new _pnpmInstaller.default()];
var found = false;

var _loop2 = function _loop2() {
  var installer = installers[_i];

  if (!installer.shouldRun) {
    return "continue";
  }

  process.chdir(rootPath);
  resolver.packages().then(function (packages) {
    console.log("Installing ".concat(packages.length, " package").concat(packages.length > 1 ? 's' : '', " using ").concat(installer.name, "..."));
    return installer.install(packages).then(function (result) {
      console.log("\n".concat(result, "\n"));
    }).catch(function (error) {
      console.error(error);
      process.exit(1);
    });
  }).catch(console.error).finally(_locker.default.release);
  found = true;
  return "break";
};

_loop: for (var _i = 0; _i < installers.length; _i++) {
  var _ret = _loop2();

  switch (_ret) {
    case "continue":
      continue;

    case "break":
      break _loop;
  }
}

if (!found) {
  _locker.default.release();

  console.error('Did not find a viable package manager to install peer dependencies with!');
  process.exit(1);
}