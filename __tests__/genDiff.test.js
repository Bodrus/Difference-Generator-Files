import genDiff from '../src';
import fs from 'fs';

// const pathToFixtures = `${__dirname}/__fixtures__`;
// const pathToBeforeJson = fs.readFileSync(`${pathToFixtures}/before.json`, 'utf-8');
// const pathToAfterJson = fs.readFileSync(`${pathToFixtures}/after.json`, 'utf-8');
const pathToExpected = fs.readFileSync(`__tests__/__fixtures__/expected.txt`, 'utf-8');

const pathBefore = `${__dirname}/__fixtures__/before.json`;
const pathAfter = `${__dirname}/__fixtures__/after.json`;

describe('genDiff', () => {
  test('set 3', () => {
    const actual = genDiff(pathBefore, pathAfter);
    expect(actual).toBe(pathToExpected);
  });
});
