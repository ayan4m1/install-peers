# install-peers

  [![NPM Version][npm-image]][npm-url]
  [![Dependency Status][dependencies-image]][dependencies-url]
  [![NPM Package Size][size-image]][size-url]

Automatically installs a project's peerDependencies in non-production environments (i.e. `NODE_ENV` is not `production`). Works with `npm`, `yarn`, `pnpm` and `nvm`.

## Installation

### NPM

```
$ npm install --save-dev --ignore-scripts install-peers
```

### Yarn

```
$ yarn add --dev --ignore-scripts install-peers
```

### PNPM
```
$ pnpm install -D --ignore-scripts install-peers
```

## Usage

`install-peers` supports the NPM, Yarn, and pnpm package managers.
Simply add `install-peers` to the `devDependencies` of your package, then run your package manager's `install` command.

_You may still see "unmet peer dependency" warnings, as the package manager is unaware of the installation this package performs._

The package manager will be instructed not to create any lock/shrinkwrap files. If you use pnpm, you may see a warning to this effect.

## Development

This project uses Babel to transpile modern JavaScript into Node-compatible syntax. This would necessitate the download
and install of Babel, then the on-the-fly compilation of source during postinstall script execution. Instead, we version
both the modern source (in `src/`) and the compiled equivalent (in `lib/`).

__NOTE__: This means that when committing changes, you should be committing files in both `src/` and `lib/`. Do not add `lib/` to `.gitignore`.

To get started, run the following commands in the `install-peers` directory:

```
$ npm install --ignore-scripts
$ npm run develop
```

This will start Babel in "watch" mode, so that any changes made to files in `src/` will be recompiled to `lib/` on the fly.

You will need a test project of some sort. In your test project's `package.json`, add:

```
"devDependencies": {
  "install-peers": "file:/path/to/install-peers"
}
```

Now you can use a package manager with your test project to trigger `install-peers` from your local environment.

Make sure you delete `node-modules` as well as any lock/shrinkwrap files every time you want to re-test `install-peers`, as the script only fires when the package is first installed.

## Known Issues

PNPM does not execute `postinstall` scripts when a package is referred to by file (for an example, see the "Development"
section of this document. Use of a private NPM registry that allows redeployment provides a workaround for development purposes.

## License

`install-peers` is distributed under the MIT license. See the LICENSE file for more information.

[npm-image]: https://img.shields.io/npm/v/install-peers.svg
[npm-url]: https://npmjs.org/package/install-peers
[dependencies-image]: https://img.shields.io/david/alexindigo/install-peers.svg
[dependencies-url]: https://david-dm.org/alexindigo/install-peers
[size-image]: https://img.shields.io/bundlephobia/minzip/install-peers.svg
[size-url]: https://bundlephobia.com/result?p=install-peers
