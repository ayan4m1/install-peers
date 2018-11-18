import path from 'path';

import { executeCommand, prepareDirectory, cleanupDirectory } from './helpers';

import YarnInstaller from "../src/yarn-installer";

describe('yarn integration', () => {
  it('evaluates shouldRun() correctly', () => {
    process.env.npm_execpath = path.join('yarn', 'bin', 'yarn.js');
    let installer = new YarnInstaller();
    expect(installer.shouldRun).toBeTruthy();
    process.env.npm_execpath = path.join('bin', 'npm-cli.js');
    installer = new YarnInstaller();
    expect(installer.shouldRun).toBeFalsy();
  });

  it('supplies the necessary args()', () => {
    const installer = new YarnInstaller();
    const args = installer.args;
    expect(args).toBeDefined();
    const { name, script, command } = args;
    expect(name).toBeDefined();
    expect(script).toBeDefined();
    expect(command).toBeDefined();
  });

  it('installs peerDependencies', async () => {
    expect.assertions(1);
    jest.setTimeout(120000);
    const initialDirectory = process.cwd();
    let tempDir;
    try {
      tempDir = await prepareDirectory();
      process.chdir(tempDir);
      await expect(executeCommand('yarn install')).resolves.toContain('is-negative');
    } finally {
      process.chdir(initialDirectory);
      await cleanupDirectory(tempDir);
    }
  });
});
