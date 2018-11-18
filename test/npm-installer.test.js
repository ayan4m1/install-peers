import path from 'path';

import { executeCommand, prepareDirectory, cleanupDirectory } from './helpers';

import NpmInstaller from "../src/npm-installer";

describe('npm integration', () => {
  it('evaluates shouldRun() correctly', () => {
    process.env.npm_execpath = path.join('bin', 'npm-cli.js');
    let installer = new NpmInstaller();
    expect(installer.shouldRun).toBeTruthy();
    process.env.npm_execpath = path.join('bin', 'cli.js');
    installer = new NpmInstaller();
    expect(installer.shouldRun).toBeFalsy();
  });

  it('supplies the necessary args()', () => {
    const installer = new NpmInstaller();
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
      await expect(executeCommand('npm install')).resolves.toContain('is-negative');
    } finally {
      process.chdir(initialDirectory);
      await cleanupDirectory(tempDir);
    }
  });
});
