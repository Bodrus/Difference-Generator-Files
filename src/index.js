import { has } from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';


const getYamlFile = (pathFile) => {
  const data = yaml.safeLoad(fs.readFileSync(pathFile, 'utf8'));
  return data;
};

const getJsonFile = (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf-8');
  return JSON.parse(`${data}`);
};

const getIniFile = (pathFile) => {
  const data = ini.parse(fs.readFileSync(pathFile, 'utf-8'));
  return data;
};

const getWay = {
  '.json': arg => getJsonFile(arg),
  '.yml': arg => getYamlFile(arg),
  '.ini': arg => getIniFile(arg),
};

const getData = (pathFile) => {
  const flag = path.extname(pathFile);
  const data = getWay[flag](pathFile);
  return data;
};

const getKeysToObjects = (after, before) => {
  const keysbefore = Object.keys(before);
  const keysAfter = Object.keys(after);
  return keysbefore.reduce((acc, el) => (keysAfter.includes(el) ? acc
    : [...acc, el]), keysAfter);
};


const getConvertTostring = (before, after) => {
  const allKeys = getKeysToObjects(after, before);

  const newString = allKeys.reduce((acc, key) => {
    if (has(after, key) && !has(before, key)) {
      return [...acc, `+ ${key}: ${after[key]}`];
    } if (has(after, key)) {
      if (before[key] === after[key]) {
        return [...acc, ` ${key}: ${after[key]}`];
      }
      const beforeStr = `- ${key}: ${before[key]}`;
      const afterStr = `+ ${key}: ${after[key]}`;
      return [...acc, `${beforeStr}`, `${afterStr}`];
    }
    return [...acc, `- ${key}: ${before[key]}`];
  }, []);

  return newString.join('\n');
};


export default (a, b) => {
  const result = getConvertTostring(getData(a), getData(b));
  return result;
};
