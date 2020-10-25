// @ts-ignore -- no
import { buildDebugXml } from '../src/build-xml';
import { DefaultConfig, FullConfig } from './test.configs';

const xsd = require('ksys-libxmljs2-xsd');

const schema = xsd.parseFile('tests/debug.xsd');

describe('buildDebugXml', () => {
  it('should generate a valid debug config', () => {
    const builder = buildDebugXml(FullConfig);
    expect(builder).toBeDefined();

    const xml = builder!.toString({prettyPrint: true});

    expect(schema.validate(xml)).toBe(null);
    expect(xml).toMatchSnapshot();
  });
  it('should no emit xml if there\'s no debug info', function() {
    const builder = buildDebugXml(DefaultConfig);
    expect(builder).toBe(undefined);
  });
})
