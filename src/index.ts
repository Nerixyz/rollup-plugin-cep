import { create } from 'xmlbuilder2';
import { Plugin } from 'rollup';
import { Options } from './types';
import { buildDebugXml, buildManifestXml } from './build-xml';
import { importConfig } from './utilities';

export default function cep(input?: Partial<Options>): Plugin {
  const options: Options = {
    configPath: 'cep.config.js',
    outputPath: 'CSXS/manifest.xml',
    debugOutputPath: '.debug',
    emitDebug: true,
    writerOptions: {
      prettyPrint: true,
    },
    ...input,
  };

  return {
    name: 'cep',
    buildStart() {
      this.addWatchFile(options.configPath);
    },
    generateBundle() {
      const config = importConfig(options.configPath);
      const built = buildManifestXml(config);
      this.emitFile({
        fileName: options.outputPath,
        type: 'asset',
        source: built.toString(options.writerOptions),
      });
      if(!options.emitDebug) return;

      const debug = buildDebugXml(config);
      if(!debug) return;

      this.emitFile({
        fileName: options.debugOutputPath,
        type: 'asset',
        source: debug.toString(options.writerOptions),
      });
    },
  };
}
