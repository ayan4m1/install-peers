import fs from 'fs';
import path from 'path';

import NpmInstaller from './install-npm.js';
import YarnInstaller from './install-yarn.js';

let rootPath = process.env.INIT_CWD || path.resolve(process.cwd(), '..', '..');
const envLabel = 'skip_install_peers_as_dev';
const defaultOptions = {
  'save': false,
  'save-bundle': false,
  'save-dev': false,
  'save-optional': false,
  'save-prod': false
};

const installers = [
  new NpmInstaller(),
  new YarnInstaller()
];

// in npm@3+ preinstall happens in `node_modules/.staging` folder
// so if we end up in `node_modules/` jump one level up
if (path.basename(rootPath) === 'node_modules') {
  rootPath = path.resolve(rootPath, '..');
}

// check for the "kill switch"
if (process.env[envLabel]) {
  console.log('Skipping installing peerDependencies as devDependencies.');
  process.exit(0);
}

// yo, do not install peers while installing peers
process.env[envLabel] = '1';

getPackageConfig(rootPath, (config) => {
  const peerDeps = getPeerDeps(config);
  const peerInstallOptions = getPeerInstallOptions(config);

  if (!peerDeps) {
    console.error(`Unable to find peerDependencies in ${rootPath}`);
    return;
  }

  // ready to install, switch directories
  process.chdir(rootPath);

  let found = false;
  for (const installer of installers) {
    if (!installer.shouldRun) {
      console.error(`skipping ${installer.command}`);
    }

    found = true;
    installer.install().then(installDone.bind(null, installer.name));
  }

  if (found === false) {
    console.error('Did not find a viable package manager to install dependencies with.');
  }
});

const installDone = (tool, result) => {
  // cleanup env
  delete process.env[envLabel];

  console.log(`Installed peerDependencies as devDependencies via ${tool}.\n\n`);
  console.log(result);
};

const getPeerDeps = (config) => {
  let peerDeps;

  if (typeof config.peerDependencies === 'object' && !Array.isArray(config.peerDependencies)) {
    peerDeps = Object.keys(config.peerDependencies).map(function (name) {
      return `${name}@${config.peerDependencies[name]}`;
    });
  }

  return peerDeps;
};

const getPeerInstallOptions = (config) => {
  const peerInstallOptions = Object.assign({}, defaultOptions);

  if (typeof config.peerInstallOptions === 'object' && !Array.isArray(config.peerInstallOptions)) {
    Object.keys(config.peerInstallOptions).forEach(function (key) {
      peerInstallOptions[key] = config.peerInstallOptions[key];
    });
  }

  return peerInstallOptions;
};

const getPackageConfig = (packagePath, callback) => {
  const packageFile = path.join(packagePath, 'package.json');

  fs.readFile(packageFile, 'utf-8', function (error, content) {
    if (error || !content) {
      console.error(`Unable to read ${packageFile}: ${error || 'no content'}`);
      return;
    }

    const config = parseConfig(content);

    if (config.isParseConfigFailed) {
      console.error(`Unable to parse ${packageFile}`, config.error);
      return;
    }

    callback(config);
  });
};

const parseConfig = (config) => {
  try {
    config = JSON.parse(config);
  } catch (error) {
    config = {isParseConfigFailed: true, error: error};
  }

  return config;
};
