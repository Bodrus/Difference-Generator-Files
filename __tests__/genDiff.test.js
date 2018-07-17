import fs from 'fs';
import genDiff from '../src';

const pathToExpected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

const pathBefore = `${__dirname}/__fixtures__/before.json`;
const pathAfter = `${__dirname}/__fixtures__/after.json`;

describe('genDiff', () => {
  test('set 3', () => {
    const actual = genDiff(pathBefore, pathAfter);
    expect(actual).toBe(pathToExpected);
  });
});
