import fs from 'fs';
import os from 'os';
import del from 'del';
import path from 'path';
import jsonFile from 'jsonfile';
import { promisify } from 'util';
import executioner from 'executioner';

const sourceDir = path.resolve(__dirname, '..');
const fixtureDir = path.join(sourceDir, 'fixtures');
const mkdtemp = promisify(fs.mkdtemp);
const execute = promisify(executioner);

/**
 * Create a temporary directory for testing package manager invocation of install-peers.
 * Due to https://github.com/nodejs/node/issues/14960 for Windows compatibility we need
 * to manually build up the path using os.tmpdir() here.
 */
const makeTempDir = async () =>
  mkdtemp(path.join(os.tmpdir(), 'install-peers-test-'));

/**
 * Creates a package.json file in the specified directory. The package.json will link to
 * the copy of install-peers above this test directory.
 *
 * @param tempDir Temporary directory to create package.json in
 * @returns {Promise} Resolved when file is
 */
const generatePackageJson = async (tempDir) => {
  const source = path.join(fixtureDir, 'package.json');
  const dest = path.join(tempDir, 'package.json');

  const json = await jsonFile.readFile(source);
  json.devDependencies['install-peers'] = `file:${sourceDir}`;
  return await jsonFile.writeFile(dest, json);
};

/**
 * Create a temporary directory and generate a package.json file in that directory.
 *
 * @returns {Promise<String>} Absolute path to temporary directory
 */
const prepareDirectory = async () => {
  const tempDir = await makeTempDir();
  await generatePackageJson(tempDir);
  return tempDir;
};

/**
 * Remove a directory.
 *
 * @param directory
 * @returns {Promise}
 */
const cleanupDirectory = async (directory) => {
  if (!directory) {
    return;
  }

  process.chdir(path.resolve(directory, '..'));
  return del(directory);
};

/**
 * Execute a command in the current directory.
 *
 * @param command
 */
const executeCommand = async (command) => execute(command, {});

export {
  executeCommand,
  prepareDirectory,
  cleanupDirectory
};
