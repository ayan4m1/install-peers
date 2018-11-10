"use strict";

var _path = _interopRequireDefault(require("path"));

var _npmInstaller = _interopRequireDefault(require("./npm-installer"));

var _yarnInstaller = _interopRequireDefault(require("./yarn-installer"));

var _pnpmInstaller = _interopRequireDefault(require("./pnpm-installer"));

var _resolver = _interopRequireDefault(require("./resolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'production') {
  console.log('Skipping peer dependency installation in production!');
  process.exit(0);
}

let rootPath = process.env.INIT_CWD || _path.default.resolve(process.cwd(), '..', '..'); // in npm@3+ preinstall happens in `node_modules/.staging` folder
// so if we end up in `node_modules/` jump one level up


if (_path.default.basename(rootPath) === 'node_modules') {
  rootPath = _path.default.resolve(rootPath, '..');
}

const resolver = new _resolver.default(rootPath);
const installers = [new _npmInstaller.default(), new _yarnInstaller.default(), new _pnpmInstaller.default()];
let found = false;

for (var _i = 0; _i < installers.length; _i++) {
  const installer = installers[_i];

  if (!installer.shouldRun) {
    continue;
  }

  process.chdir(rootPath);
  resolver.packages().then(packages => {
    console.log(`Installing ${packages.length} package${packages.length > 1 ? 's' : ''} using ${installer.args.name}...`);
    return installer.install(packages).then(result => {
      console.log(`\n${result}\n`);
    });
  }).catch(error => {
    console.error(error);
    process.exit(1);
  }); //.finally(Locker.release);

  found = true;
  break;
}

if (!found) {
  //Locker.release();
  console.error('Did not find a viable package manager to install peer dependencies with!');
  process.exit(1);
}