import { Config, ExecutionEnvironment, ExtensionDispatchInfo } from './types';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { create } from 'xmlbuilder2';
import { makeExtensionId, makeVersion, objectToXml, optAttrToXml, vec2xml } from './utilities';

export function buildManifestXml({ extensions, executionEnvironment, ...config }: Config): XMLBuilder {
  const doc = {
    ExtensionManifest: {
      '@Version': makeVersion(config.manifestVersion ?? '9.0'),
      '@ExtensionBundleId': config.bundleId,
      '@ExtensionBundleVersion': makeVersion(config.bundleVersion ?? '1.0.0'),
      '@ExtensionBundleName': config.bundleName,
      Author: config.author,
      Contact: config.contact && { '@mailto': config.contact.mailto, '#text': config.contact.value },
      Legal: optAttrToXml(config.legal, 'href'),
      Abstract: optAttrToXml(config.abstract, 'href'),
      ExtensionList: {
        Extension: extensions.map(ext => ({
          '@Id': makeExtensionId(config.bundleId, ext.id),
          '@Version': ext.version && makeVersion(ext.version),
        })),
      },
      ExecutionEnvironment: executionEnvironmentToXml(executionEnvironment),
      DispatchInfoList: {
        Extension:  extensions.map(extension => ({
          '@Id': makeExtensionId(config.bundleId, extension.id),
          HostList: extension.hostList?.map(host => ({
            Host: {
              '@Name': host,
            },
          })),
          DispatchInfo: extension.dispatchInfos.map(dispatchInfoToXml),
          DependencyList: extension.dependencies && {
            Dependency: objectToXml(extension.dependencies, (id, version) => ({
              '@Id': id,
              '@Version': version,
            })),
          },
        })),
      },
    },
  };

  return create({ encoding: 'UTF-8', standalone: false }, doc);
}

export function buildDebugXml({extensions, bundleId}: Config): XMLBuilder | undefined {
  if(!extensions?.some(ex => ex.debug)) return undefined;

  const doc = {
    ExtensionList: {
      Extension: extensions.filter(ex => ex.debug).map(ex => ({
        '@Id': makeExtensionId(bundleId, ex.id),
        HostList: {
          Host: objectToXml(ex.debug, (name, port) => ({
            '@Name': name,
            '@Port': port,
          })),
        },
      })),
    }
  };

  return create({ encoding: 'UTF-8' }, doc);
}

function executionEnvironmentToXml({ hostList, localeList, requiredRuntime }: ExecutionEnvironment) {
  return {
    HostList: objectToXml(hostList, (name, version) => ({
      Host: {
        '@Name': name,
        '@Version': makeVersion(version),
      },
    })),
    LocaleList: localeList && {
      Locale: localeList.map(loc => ({
        '@Code': loc,
      })),
    },
    RequiredRuntimeList: requiredRuntime && {
      RequiredRuntime: {
        '@Name': 'CSXS',
        '@Version': makeVersion(requiredRuntime),
      },
    },
  };
}

function dispatchInfoToXml({ commandLineParameters, ...info }: ExtensionDispatchInfo) {
  return {
    '@Host': info.host,
    Resources: (info.mainPath || info.scriptPath || commandLineParameters) && {
      MainPath: info.mainPath,
      ScriptPath: optAttrToXml(info.scriptPath, 'engine'),
      CEFCommandLine: commandLineParameters && {
        Parameter: commandLineParameters,
      },
    },
    Lifecycle: {
      AutoVisible: (info.autoVisible ?? true)?.toString(),
      StartOn: info.startOn && {
        Event: info.startOn,
      },
    },
    UI: (info.type ||
      info.menu ||
      info.screenPercentage ||
      info.size ||
      info.maxSize ||
      info.minSize ||
      info.icons) && {
      Type: info.type,
      Menu: optAttrToXml(info.menu, 'placement'),
      Geometry: (info.screenPercentage || info.size || info.minSize || info.maxSize) && {
        ScreenPercentage: vec2xml(info.screenPercentage),
        Size: vec2xml(info.size),
        MaxSize: vec2xml(info.maxSize),
        MinSize: vec2xml(info.minSize),
      },
      Icons: info.icons && {
        Icon: objectToXml(info.icons, (key, value) => ({
          '@Type': key,
          '#text': value,
        })),
      },
    },
  };
}
