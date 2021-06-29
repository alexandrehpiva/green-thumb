import { encode, decode } from './base64';

type MockData = {
  test: number;
  value: Record<string, any> | string | number;
  encoded: string;
};

const data: MockData[] = [
  { test: 1, value: 'A string value', encoded: 'IkEgc3RyaW5nIHZhbHVlIg==' },
  { test: 2, value: 10, encoded: 'MTA=' },
  { test: 3, value: 12345.6789, encoded: 'MTIzNDUuNjc4OQ==' },
  {
    test: 4,
    value: { str: '1', num: 1, obj: { name: 'value' }, arr: [1, 2, 3, 4] },
    encoded:
      'eyJzdHIiOiIxIiwibnVtIjoxLCJvYmoiOnsibmFtZSI6InZhbHVlIn0sImFyciI6WzEsMiwzLDRdfQ==',
  },
];

describe('Unit(base64) - encode', () => {
  it.each(data)(
    'should encode the value correctly (test $test)',
    ({ value, encoded }) => {
      expect(encode(value)).toEqual(encoded);
    }
  );

  it('should thrown Error if try to encode an invalid type', () => {
    const fn = () => encode(((v = 'test') => v) as any);

    expect(fn).toThrowError();
  });
});

describe('Unit(base64) - decode', () => {
  it.each(data)(
    'should decode the value correctly (test $test)',
    ({ value, encoded }) => {
      expect(decode(encoded)).toEqual(value);
    }
  );

  it('should thrown Error if cannot decode the string', () => {
    const fn = () => decode('abcdefg123456789');

    expect(fn).toThrowError();
  });
});
