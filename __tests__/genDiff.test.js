import fs from 'fs';
import genDiff from '../src';

const pathToExpected = '__tests__/__fixtures__/expected.txt';
const pathJsonBefore = '__tests__/__fixtures__/before.json';
const pathJsonAfter = '__tests__/__fixtures__/after.json';
const pathYamlBefore = '__tests__/__fixtures__/before.yml';
const pathYamlAfter = '__tests__/__fixtures__/after.yml';
const pathIniBefore = '__tests__/__fixtures__/before.ini';
const pathIniAfter = '__tests__/__fixtures__/after.ini';


test('json', () => {
  const actual = genDiff(pathJsonBefore, pathJsonAfter);
  expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
});

test('yaml', () => {
  const actual = genDiff(pathYamlBefore, pathYamlAfter);
  expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
});

test('ini', () => {
  const actual = genDiff(pathIniBefore, pathIniAfter);
  expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
});
