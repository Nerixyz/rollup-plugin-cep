import { Config } from '../src/types';

export const DefaultConfig: Config = {
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
    },
  ],
};

export const FullConfig: Config = {
  manifestVersion: '7.0',
  bundleId: 'de.nerixyz.bundle',
  bundleVersion: '2.0',
  bundleName: 'My Bundle',
  author: 'Nerixyz',
  contact: {
    value: 'nerixyz.de',
    mailto: 'mail@test.com',
  },
  legal: {
    value: 'Legal stuff',
    href: 'https://nerixyz.de',
  },
  abstract: {
    value: 'Abstract',
    href: 'https://nerixyz.de',
  },
  executionEnvironment: {
    requiredRuntime: '4.0',
    localeList: ['de_DE', 'en_GB'],
    hostList: {
      AEFT: '14.0',
    },
  },
  extensions: [{
    id: 'extension1',
    hostList: ['4.0'],
    version: [3, 45],
    dependencies: {
      MyDep: '3',
    },
    debug: {
      AEFT: 1337,
    },
    dispatchInfos: [{
      autoVisible: false,
      minSize: [7,7],
      size: [8,8],
      maxSize: [9,9],
      menu: 'My Menu Item',
      type: 'Panel',
      commandLineParameters: ['--enable-nodejs', '--some-other-parameter'],
      mainPath: './index.html',
      scriptPath: './index.jsx',
      host: 'dispatch host',
      icons: {DarkNormal: './myIcon.webp', DarkRollOver: './myOtherIcon.avif', Disabled: './someOtherIcon', Normal: './something', RollOver: './icon'},
      screenPercentage: [123, 456],
      startOn: ['myEvent', 'otherEvent'],
    }, {
      autoVisible: false,
      minSize: [7,7],
      size: [8,8],
      maxSize: [9,9],
      menu: 'My Second Item',
      type: 'Panel',
      commandLineParameters: ['--enable-nodejs', '--some-other-parameter'],
      mainPath: './index.html#other-location',
      scriptPath: './index.jsx',
      host: 'dispatch host',
      icons: {DarkNormal: './myIcon.webp', DarkRollOver: './myOtherIcon.avif', Disabled: './someOtherIcon', Normal: './something', RollOver: './icon'},
      screenPercentage: [123, 456],
      startOn: ['myEvent', 'otherEvent'],
    }],
  },{
    id: 'extension2',
    hostList: ['4.0'],
    version: [3, 45],
    dependencies: {
      MyDep: '3',
    },
    debug: {
      AEFT: 1337,
    },
    dispatchInfos: [{
      autoVisible: false,
      minSize: [7,7],
      size: [8,8],
      maxSize: [9,9],
      menu: 'My Menu Item',
      type: 'Panel',
      commandLineParameters: ['--enable-nodejs', '--some-other-parameter'],
      mainPath: './index.html',
      scriptPath: './index.jsx',
      host: 'dispatch host',
      icons: {DarkNormal: './myIcon.webp', DarkRollOver: './myOtherIcon.avif', Disabled: './someOtherIcon', Normal: './something', RollOver: './icon'},
      screenPercentage: [123, 456],
      startOn: ['myEvent', 'otherEvent'],
    }, {
      autoVisible: false,
      minSize: [7,7],
      size: [8,8],
      maxSize: [9,9],
      menu: 'My Second Item',
      type: 'Panel',
      commandLineParameters: ['--enable-nodejs', '--some-other-parameter'],
      mainPath: './index.html#other-location',
      scriptPath: './index.jsx',
      host: 'dispatch host',
      icons: {DarkNormal: './myIcon.webp', DarkRollOver: './myOtherIcon.avif', Disabled: './someOtherIcon', Normal: './something', RollOver: './icon'},
      screenPercentage: [123, 456],
      startOn: ['myEvent', 'otherEvent'],
    }],
  }]
}
