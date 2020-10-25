module.exports = {
  bundleId: 'de.nerixyz.build',
  bundleVersion: [1, 0, 0],
  manifestVersion: '7.0',
  executionEnvironment: {
    requiredRuntime: '4.0',
    localeList: ['All'],
    hostList: { AEFT: 14.0 },
  },
  extensions: [
    {
      id: 'test',
      version: [2, 0, 1],
      dispatchInfos: [
        {
          mainPath: './index.html#root',
          type: 'Panel',
          menu: 'My Menu Item',
          size: [200, 150],
          minSize: [100, 100],
        },
      ],
      debug: {
        AEFT: 1337,
      }
    },
  ],
}
