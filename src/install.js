if (process.env.NODE_ENV === 'production') {
  console.log('Skipping peer dependency installation!');
  process.exit(0);
}

import path from 'path';

import Locker from './locker';
import NpmInstaller from './npm-installer';
import YarnInstaller from './yarn-installer';
import PNpmInstaller from './pnpm-installer';
import PeerResolver from './peer-resolver';

if (!Locker.claim()) {
  console.dir('Skipping peer dependency installation as it is already running!');
  process.exit(0);
}

let rootPath = process.env.INIT_CWD || path.resolve(process.cwd(), '..', '..');

// in npm@3+ preinstall happens in `node_modules/.staging` folder
// so if we end up in `node_modules/` jump one level up
if (path.basename(rootPath) === 'node_modules') {
  rootPath = path.resolve(rootPath, '..');
}

const resolver = new PeerResolver(rootPath);
const installers = [
  new NpmInstaller(),
  new YarnInstaller(),
  new PNpmInstaller()
];

let found = false;
for (const installer of installers) {
  if (!installer.shouldRun) {
    continue;
  }

  process.chdir(rootPath);

  resolver
    .packages()
    .then((packages) => {
      console.log(`Installing ${packages.length} package${packages.length > 1 ? 's' : ''} using ${installer.name}...`);
      return installer
        .install(packages)
        .then((result) => {
          console.log(`\n${result}\n`);
        })
        .catch((error) => {
          console.error(error);
          process.exit(1);
        });
    })
    .catch(console.error)
    .finally(Locker.release);

  found = true;
  break;
}

if (!found) {
  Locker.release();
  console.error('Did not find a viable package manager to install peer dependencies with!');
  process.exit(1);
}
