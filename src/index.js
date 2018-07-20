// import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getAst from './getAst';
import getParser from './getParsers';


const getData = (pathFile) => {
  const extName = path.extname(pathFile);
  const parser = getParser(extName);
  const data = fs.readFileSync(pathFile, 'utf-8');
  const result = parser(data);
  return result;
};


export default (a, b) => {
  const result = getAst(getData(a), getData(b));
  // const result = getConvertTostring(getData(a), getData(b));
  return result;
};
