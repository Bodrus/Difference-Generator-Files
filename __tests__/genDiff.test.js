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
const beforeYAMLtree = pathToFixtures('afterTree.yml');

// Путь к файлу результат
const result = pathToFixtures('expected.txt');
const resultTree = pathToFixtures('treeExpected.txt');
// const resultPlain = pathToFixtures('resultPlain.txt');


describe('difference tests', () => {
  const expectedFlat = fs.readFileSync(result, 'utf-8');
  const expectedDeep = fs.readFileSync(resultTree, 'utf-8');
  // const expectedPlain = fs.readFileSync(resultPlain, 'utf-8');


  it('flat JSON', () => {
    expect(genDiff(afterJSON, beforeJSON)).toEqual(expectedFlat);
  });

  it('tree JSON', () => {
    expect(genDiff(beforeJSONtree, afterJSONtree)).toEqual(expectedDeep);
  });

  it('flat INI', () => {
    expect(genDiff(afterINI, beforeINI)).toEqual(expectedFlat);
  });

  it('tree INI', () => {
    expect(genDiff(afterINItree, beforeINItree)).toEqual(expectedDeep);
  });

  it('flat YAML', () => {
    expect(genDiff(afterYAML, beforeYAML)).toEqual(expectedFlat);
  });

  it('tree YAML', () => {
    expect(genDiff(afterYAMLtree, beforeYAMLtree)).toEqual(expectedDeep);
  });
  // it('JSON with format PLAIN', () => {
  //   expect(genDiff(afterYAMLtree, beforeYAMLtree, 'plain')).toEqual(expectedPlain);
  // });
});
