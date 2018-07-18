import { has } from 'lodash';
import fs from 'fs';


const getData = (pathFile) => {
  const fileData = fs.readFileSync(pathFile, 'utf-8');
  return fileData;
};


const convert = (beforeJson, afterJson) => {
  const parseBeforeJson = JSON.parse(`${beforeJson}`);
  const parseAfterJson = JSON.parse(`${afterJson}`);
  const keysbefore = Object.keys(parseBeforeJson);
  const keysAfter = Object.keys(parseAfterJson);
  const allKeys = keysbefore.reduce((acc, el) => (keysAfter.includes(el) ? acc
    : [...acc, el]), keysAfter);


  const newString = allKeys.reduce((acc, key) => {
    if (has(parseAfterJson, key) && !has(parseBeforeJson, key)) {
      return acc.concat(`+ ${key}: ${parseAfterJson[key]}`);
    } if (has(parseAfterJson, key)) {
      if (parseBeforeJson[key] === parseAfterJson[key]) {
        return acc.concat(` ${key}: ${parseAfterJson[key]}`);
      }
      const beforeStr = `- ${key}: ${parseBeforeJson[key]}`;
      const afterStr = `+ ${key}: ${parseAfterJson[key]}`;
      return acc.concat(`${beforeStr}`, `${afterStr}`);
    }
    return acc.concat(`- ${key}: ${parseBeforeJson[key]}`);
  }, []);

  return newString.join('\n');
};


export default (a, b) => {
  const result = convert(getData(a), getData(b));
  return result;
};
