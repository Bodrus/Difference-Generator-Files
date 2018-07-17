import { has } from 'lodash';
import fs from 'fs';


const getData = (pathFile) => {
  const fileData = fs.readFileSync(pathFile, 'utf-8');
  return fileData;
};


const changeToString = (args) => {
  const iter = (arr, acc) => {
    const [el, ...rest] = arr;
    if (rest.length === 0) {
      const key = Object.keys(el[1]);
      return `${acc}${el[0]} ${key}: ${el[1][key]}`;
    }
    const key = Object.keys(el[1]);
    const newAcc = `${acc}${el[0]} ${key}: ${el[1][key]}\n`;
    return iter(rest, newAcc);
  };
  return iter(args, '');
};


const iter = (beforJson, afterJson) => {
  const parseBeforJson = JSON.parse(`${beforJson}`);
  const parseAfterJson = JSON.parse(`${afterJson}`);
  const keysbefor = Object.keys(parseBeforJson);
  const keysAfter = Object.keys(parseAfterJson);
  const allKeys = keysbefor.reduce((acc, el) => (keysAfter.includes(el) ? acc
    : [...acc, el]), keysAfter);

  const newJson = allKeys.reduce((acc, key) => {
    if (has(parseAfterJson, key) && !has(parseBeforJson, key)) {
      return [...acc, ['+', { [key]: parseAfterJson[key] }]];
    } if (has(parseAfterJson, key)) {
      if (parseBeforJson[key] === parseAfterJson[key]) {
        return [...acc, ['', { [key]: parseAfterJson[key] }]];
      }
      const beforObj = ['-', { [key]: parseBeforJson[key] }];
      const afterObj = ['+', { [key]: parseAfterJson[key] }];
      return [...acc, beforObj, afterObj];
    }
    return [...acc, ['-', { [key]: parseBeforJson[key] }]];
  }, []);

  return newJson;
};


export default (a, b) => {
  const result = iter(getData(a), getData(b));
  return changeToString(result);
};
