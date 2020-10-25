import { Config, Vec2, Version } from './types';
import {resolve} from 'path';

export function makeVersion(version: Version): string {
  if (!Array.isArray(version)) return version.toString();
  return version.join('.');
}

export function importConfig(path: string): Config {
  let mod = require(resolve(path));
  if (mod.default) mod = mod.default;
  if (typeof mod === 'function') return mod();
  return mod;
}

export function optAttrToXml<T extends string>(
  obj:
    | undefined
    | string
    | ({
    [x in T]?: string;
  } & { value: string }),
  key: T,
) {
  if (!obj) return undefined;

  return typeof obj === 'string'
    ? obj
    : {
      [`@${key}`]: obj[key],
      '#text': obj.value,
    };
}

export function makeExtensionId(bundleId: string, extensionId: string): string {
  return extensionId.startsWith(bundleId) ? extensionId : `${bundleId}.${extensionId}`;
}

export function objectToXml<K extends string | number, V>(
  obj: Record<K, V> | undefined,
  mapFn: (key: K, value: V) => Record<string, unknown>,
): Record<string, unknown>[] | undefined {
  if (!obj) return undefined;
  return Object.entries(obj).map(([key, value]) => mapFn(key as K, value as V));
}

export function vec2xml(vec?: Vec2) {
  if (!vec) return undefined;
  const [width, height] = vec;
  if (width === undefined && height === undefined) return undefined;

  return {
    Height: height?.toString(),
    Width: width?.toString(),
  };
}
