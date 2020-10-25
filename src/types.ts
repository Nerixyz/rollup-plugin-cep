import { XMLWriterOptions } from 'xmlbuilder2/lib/interfaces';

export interface Options {
  configPath: string;
  outputPath: string;
  debugOutputPath: string;
  emitDebug: boolean;
  writerOptions?: XMLWriterOptions;
}

export interface Config {
  manifestVersion?: Version;
  bundleId: string;
  bundleName?: string;
  bundleVersion?: Version;
  extensions: Extension[];
  executionEnvironment: ExecutionEnvironment;
  author?: string;
  contact?: { mailto?: string; value?: string };
  legal?: string | { href?: string; value: string };
  abstract?: string | { href?: string; value: string };
}

export interface ExecutionEnvironment {
  hostList: Record<string, Version>;
  localeList?: string[];
  requiredRuntime?: Version;
}

export type Vec2 = [number | string | undefined, number | string | undefined];
export type Version = string | string[] | number | number[];

export interface Extension {
  id: string;
  version?: Version;
  dependencies?: Record<string, string>;
  hostList?: string[];
  dispatchInfos: ExtensionDispatchInfo[];
  debug?: Record<string, number | string>;
}

export interface ExtensionDispatchInfo {
  mainPath?: string;
  scriptPath?: string | { value: string; engine?: string };
  commandLineParameters?: string[];
  autoVisible?: boolean;
  startOn?: string[];
  type?: 'Panel' | 'ModalDialog' | 'Modeless' | 'Custom' | 'Embedded' | 'Dashboard';
  menu?: string | { value: string; placement?: string };
  screenPercentage?: Vec2;
  size?: Vec2;
  maxSize?: Vec2;
  minSize?: Vec2;
  icons?: Record<'Normal' | 'Disabled' | 'RollOver' | 'DarkNormal' | 'DarkRollOver', string>;
  host?: string;
}
