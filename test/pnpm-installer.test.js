import path from 'path';

import PNpmInstaller from "../src/pnpm-installer";

describe('pnpm integration', () => {
  it('evaluates shouldRun() correctly', () => {
    process.env.npm_execpath = path.join('pnpm', 'bin', 'pnpm.js');
    let installer = new PNpmInstaller();
    expect(installer.shouldRun).toBeTruthy();
    process.env.npm_execpath = path.join('bin', 'npm-cli.js');
    installer = new PNpmInstaller();
    expect(installer.shouldRun).toBeFalsy();
  });

  it('supplies the necessary args()', () => {
    const installer = new PNpmInstaller();
    const args = installer.args;
    expect(args).toBeDefined();
    const { name, script, command } = args;
    expect(name).toBeDefined();
    expect(script).toBeDefined();
    expect(command).toBeDefined();
  });
});
