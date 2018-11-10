if (process.env.NODE_ENV === 'production') {
  console.log('Skipping peer dependency installation in production!');
  process.exit(0);
}

import path from 'path';

import NpmInstaller from './npm-installer';
import YarnInstaller from './yarn-installer';
import PNpmInstaller from './pnpm-installer';
import Resolver from './resolver';

let rootPath = process.env.INIT_CWD || path.resolve(process.cwd(), '..', '..');

// in npm@3+ preinstall happens in `node_modules/.staging` folder
// so if we end up in `node_modules/` jump one level up
if (path.basename(rootPath) === 'node_modules') {
  rootPath = path.resolve(rootPath, '..');
}

let found;
const resolver = new Resolver(rootPath);
const installers = [
  new NpmInstaller(),
  new YarnInstaller(),
  new PNpmInstaller()
];

for (const installer of installers) {
  if (!installer.shouldRun) {
    continue;
  }

  process.chdir(rootPath);

  resolver
    .packages()
    .then((packages) => {
      console.log(`Installing ${packages.length} package${packages.length > 1 ? 's' : ''} using ${installer.args.name}...`);
      return installer
        .install(packages)
        .then((result) => {
          console.log(`\n${result}\n`);
        });
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

  found = true;
  break;
}

if (!found) {
  console.error('Did not find a viable package manager to install peer dependencies with!');
  process.exit(1);
}
