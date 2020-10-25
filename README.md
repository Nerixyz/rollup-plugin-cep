# rollup-plugin-cep

This plugin will add the `CSXS/manifest.xml` and `.debug` files to your rollup build.

# Setup

* Install the plugin (`npm i -D rollup-plugin-cep`).

* Add the plugin to your build:
 ```diff
+import cep from 'rollup-plugin-cep';
 
export default {
  //...
  plugins: [
    //...
+   cep()
    //...
  ]
}
```

* Add a `config.cep.js` file in your root directory:

```js
/** @type {import('rollup-plugin-cep').Config} */
module.exports = {
  bundleId: 'de.nerixyz.build',
  // or: '1.0.0'
  bundleVersion: [1, 0, 0],
  manifestVersion: '7.0',
  executionEnvironment: {
    requiredRuntime: '4.0',
    localeList: ['All'],
    hostList: { AEFT: 14.0 },
  },
  extensions: [
    {
      // resolves to 'de.nerixyz.build.test'
      id: 'test',
      // same as 'bundleVersion'
      version: [2, 0, 1],
      dispatchInfos: [
        {
          mainPath: './index.html#root',
          type: 'Panel',
          // menu name
          menu: 'My Menu Item',
          // [width, height]
          size: [200, 150],
          minSize: [100, 100],
        },
      ],
      // optional, will create a .debug file with the posrts specified (per extension)
      debug: {
        AEFT: 1234,
      }
    },
  ],
};
```
