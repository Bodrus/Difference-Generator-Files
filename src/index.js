import { has } from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';


const getYamlFile = (pathFile) => {
  const data = yaml.safeLoad(fs.readFileSync(pathFile, 'utf8'));
  return data;
};

const getJsonFile = (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf-8');
  return JSON.parse(`${data}`);
};

const getWay = {
  '.json': arg => getJsonFile(arg),
  '.yml': arg => getYamlFile(arg),
};

const getData = (pathFile) => {
  const flag = path.extname(pathFile);
  const data = getWay[flag](pathFile);
  return data;
};


const convertTostring = (before, after) => {
  const keysbefore = Object.keys(before);
  const keysAfter = Object.keys(after);
  const allKeys = keysbefore.reduce((acc, el) => (keysAfter.includes(el) ? acc
    : [...acc, el]), keysAfter);

  const newString = allKeys.reduce((acc, key) => {
    if (has(after, key) && !has(before, key)) {
      return acc.concat(`+ ${key}: ${after[key]}`);
    } if (has(after, key)) {
      if (before[key] === after[key]) {
        return acc.concat(` ${key}: ${after[key]}`);
      }
      const beforeStr = `- ${key}: ${before[key]}`;
      const afterStr = `+ ${key}: ${after[key]}`;
      return acc.concat(`${beforeStr}`, `${afterStr}`);
    }
    return acc.concat(`- ${key}: ${before[key]}`);
  }, []);

  return newString.join('\n');
};


export default (a, b) => {
  const result = convertTostring(getData(a), getData(b));
  return result;
};
