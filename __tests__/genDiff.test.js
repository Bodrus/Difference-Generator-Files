import fs from 'fs';
import genDiff from '../src';


const pathToFixtures = str => `__tests__/__fixtures__/${str}`;

const afterJSON = pathToFixtures('before.json');
const beforeJSON = pathToFixtures('after.json');
const beforeJSONtree = pathToFixtures('beforeTree.json');
const afterJSONtree = pathToFixtures('afterTree.json');

const afterINI = pathToFixtures('before.ini');
const beforeINI = pathToFixtures('after.ini');
const afterINItree = pathToFixtures('beforeTree.ini');
const beforeINItree = pathToFixtures('afterTree.ini');

const afterYAML = pathToFixtures('before.yml');
const beforeYAML = pathToFixtures('after.yml');
const afterYAMLtree = pathToFixtures('beforeTree.yml');
const beforeYAMLtree = pathToFixtures('afterTree.yaml');


const result = pathToFixtures('expected.txt');
const resultTree = pathToFixtures('treeExpected.txt');


describe('difference tests', () => {
  const expectedFlat = fs.readFileSync(result, 'UTF-8');
  const expectedDeep = fs.readFileSync(resultTree, 'UTF-8');

  it('difference test for flat JSON', () => {
    expect(genDiff(afterJSON, beforeJSON)).toEqual(expectedFlat);
  });

  it('difference test for deep JSON', () => {
    expect(genDiff(beforeJSONtree, afterJSONtree)).toEqual(expectedDeep);
  });

  it('difference test for flat YAML', () => {
    expect(genDiff(afterYAML, beforeYAML)).toEqual(expectedFlat);
  });

  it('difference test for deep YAML', () => {
    expect(genDiff(afterYAMLtree, beforeYAMLtree)).toEqual(expectedDeep);
  });

  it('difference test for flat INI', () => {
    expect(genDiff(afterINI, beforeINI)).toEqual(expectedFlat);
  });

  it('difference test for deep INI', () => {
    expect(genDiff(afterINItree, beforeINItree)).toEqual(expectedDeep);
  });
});
