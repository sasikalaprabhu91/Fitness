const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Define a blocklist to prevent Metro from watching problematic directories or symlinks
    blockList: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
      /.*\.git\/.*/,
      /.*\/__tests__\/.*/,
      // Add any additional paths you want to exclude
    ]),
    // Add any custom source extensions if necessary
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'], // Add 'cjs' if needed
  },
};

module.exports = mergeConfig(defaultConfig, config);
