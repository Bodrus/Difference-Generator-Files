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


const iter = (beforeJson, afterJson) => {
  const parseBeforeJson = JSON.parse(`${beforeJson}`);
  const parseAfterJson = JSON.parse(`${afterJson}`);
  const keysbefore = Object.keys(parseBeforeJson);
  const keysAfter = Object.keys(parseAfterJson);
  const allKeys = keysbefore.reduce((acc, el) => (keysAfter.includes(el) ? acc
    : [...acc, el]), keysAfter);

  const newJson = allKeys.reduce((acc, key) => {
    if (has(parseAfterJson, key) && !has(parseBeforeJson, key)) {
      return [...acc, ['+', { [key]: parseAfterJson[key] }]];
    } if (has(parseAfterJson, key)) {
      if (parseBeforeJson[key] === parseAfterJson[key]) {
        return [...acc, ['', { [key]: parseAfterJson[key] }]];
      }
      const beforeObj = ['-', { [key]: parseBeforeJson[key] }];
      const afterObj = ['+', { [key]: parseAfterJson[key] }];
      return [...acc, beforeObj, afterObj];
    }
    return [...acc, ['-', { [key]: parseBeforeJson[key] }]];
  }, []);

  return newJson;
};


export default (a, b) => {
  const result = iter(getData(a), getData(b));
  return changeToString(result);
};
