import fs from 'fs';
import genDiff from '../src';

const pathToExpected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

const pathJsonBefore = `${__dirname}/__fixtures__/before.json`;
const pathJsonAfter = `${__dirname}/__fixtures__/after.json`;
const pathYamlBefore = `${__dirname}/__fixtures__/before.yml`;
const pathYamlAfter = `${__dirname}/__fixtures__/after.yml`;

describe('genDiff', () => {
  test('json', () => {
    const actual = genDiff(pathJsonBefore, pathJsonAfter);
    expect(actual).toBe(pathToExpected);
  });
  test('yaml', () => {
    const actual = genDiff(pathYamlBefore, pathYamlAfter);
    expect(actual).toBe(pathToExpected);
  });
});
