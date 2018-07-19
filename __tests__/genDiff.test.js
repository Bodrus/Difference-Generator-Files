import fs from 'fs';
import genDiff from '../src';

// const pathToExpectedTreeTest = '__tests__/__fixtures__/__testFixtures__/testTest.txt';
// const pathJsonBeforeTreeTest = '__tests__/__fixtures__/__testFixtures__/afterTest.json';
// const pathJsonAfterTreeTest = '__tests__/__fixtures__/__testFixtures__/beforeTest.json';

const pathToExpectedTree = '__tests__/__fixtures__/treeExpected.txt';
const pathJsonBeforeTree = '__tests__/__fixtures__/beforeTree.json';
const pathJsonAfterTree = '__tests__/__fixtures__/afterTree.json';

// const pathYamlBeforeTree = '__tests__/__fixtures__/before.yml';
// const pathYamlAfterTree = '__tests__/__fixtures__/after.yml';
// const pathIniBeforeTree = '__tests__/__fixtures__/before.ini';
// const pathIniAfterTree = '__tests__/__fixtures__/after.ini';

// const pathToExpected = '__tests__/__fixtures__/expected.txt';
// const pathJsonBefore = '__tests__/__fixtures__/before.json';
// const pathJsonAfter = '__tests__/__fixtures__/after.json';
// const pathYamlBefore = '__tests__/__fixtures__/before.yml';
// const pathYamlAfter = '__tests__/__fixtures__/after.yml';
// const pathIniBefore = '__tests__/__fixtures__/before.ini';
// const pathIniAfter = '__tests__/__fixtures__/after.ini';


// test('json', () => {
//   const actual = genDiff(pathJsonBefore, pathJsonAfter);
//   expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
// });

// test('yaml', () => {
//   const actual = genDiff(pathYamlBefore, pathYamlAfter);
//   expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
// });

// test('ini', () => {
//   const actual = genDiff(pathIniBefore, pathIniAfter);
//   expect(actual).toBe(fs.readFileSync(pathToExpected, 'utf8'));
// });

test('jsonTree', () => {
  const actual = genDiff(pathJsonBeforeTree, pathJsonAfterTree);
  expect(actual).toBe(fs.readFileSync(pathToExpectedTree, 'utf8'));
});

// test('jsonTree', () => {
//   const actual = genDiff(pathJsonBeforeTreeTest, pathJsonAfterTreeTest);
//   expect(actual).toBe(fs.readFileSync(pathToExpectedTreeTest, 'utf8'));
// });
