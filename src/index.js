import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';


const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const getParser = extName => parsers[extName];

const getData = (pathFile) => {
  const extName = path.extname(pathFile);
  const parser = getParser(extName);
  const data = fs.readFileSync(pathFile, 'utf-8');
  const result = parser(data);
  return result;
};

const getKeysFromObjects = (after, before) => _.union(_.keys(after), _.keys(before));

const getAst = (before, after) => {
  const keys = getKeysFromObjects(after, before);

  return keys.reduce((acc, key) => {
    if (_.has(after, key) && !_.has(before, key)) {
      return [...acc, {
        type: 'added', key, beforeValue: '', afterValue: after[key], children: [],
      }];
    }
    if (_.has(after, key) && _.has(before, key)) {
      if (before[key] instanceof Object && after[key] instanceof Object) {
        return [...acc, {
          type: 'unchanged', key, beforeValue: '', afterValue: '', children: getAst(before[key], after[key]),
        }];
      }
      if (before[key] === after[key]) {
        return [...acc, {
          type: 'uncheged', key, beforeValue: before[key], afterValue: after[key], children: [],
        }];
      }
      return [...acc, {
        type: 'changed', key, beforeValue: before[key], afterValue: after[key], children: [],
      }];
    }
    return [...acc, {
      type: 'deleted', key, beforeValue: before[key], afterValue: '', children: [],
    }];
  }, []);
};

// const getConvertTostring = (before, after) => {
  //   const keys = getKeysFromObjects(after, before);

//   const newString = keys.reduce((acc, key) => {
  //     if (_.has(after, key) && !_.has(before, key)) {
//       return [...acc, `+ ${key}: ${after[key]}`];
//     } if (_.has(after, key)) {
//       if (before[key] === after[key]) {
  //         return [...acc, ` ${key}: ${after[key]}`];
  //       }
  //       const beforeStr = `- ${key}: ${before[key]}`;
  //       const afterStr = `+ ${key}: ${after[key]}`;
//       return [...acc, `${beforeStr}`, `${afterStr}`];
//     }
//     return [...acc, `- ${key}: ${before[key]}`];
//   }, []);

//   return newString.join('\n');
// };


export default (a, b) => {
  const result = getAst(getData(a), getData(b));
  // const result = getConvertTostring(getData(a), getData(b));
  return result;
};
