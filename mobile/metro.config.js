const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// This app lives inside an npm workspace (see the repo root package.json),
// so shared dependencies are hoisted to the monorepo root node_modules.
// Metro needs to be told to watch and resolve from there too.
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..');

const config = {
  watchFolders: [monorepoRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(monorepoRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
