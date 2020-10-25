import { buildManifestXml } from '../src/build-xml';
import { DefaultConfig, FullConfig } from './test.configs';
// @ts-ignore -- no
const xsd = require('ksys-libxmljs2-xsd');

const schema = xsd.parseFile('tests/manifest.xsd');

describe('buildManifestXml', () => {
  it('should build valid xml', () => {
    const content = buildManifestXml(DefaultConfig);
    const xml = content.toString({prettyPrint: true});

    expect(schema.validate(xml)).toBe(null);
    expect(xml).toMatchSnapshot();
  });

  it('should build a full config', () => {
    const content = buildManifestXml(FullConfig);
    const xml = content.toString({prettyPrint: true});

    expect(schema.validate(xml)).toBe(null);
    expect(xml).toMatchSnapshot();
  });
});
