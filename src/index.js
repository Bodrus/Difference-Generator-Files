import fs from 'fs';
import path from 'path';
import getAst from './getAst';
import parsers from './parsers';
import getRender from './renderers';


const getData = (pathFile) => {
  const extName = path.extname(pathFile);
  const parser = parsers(extName);
  const data = fs.readFileSync(pathFile, 'utf-8');
  const result = parser(data);
  return result;
};


export default (a, b, format = 'standart') => {
  const result = getAst(getData(a), getData(b));
  const render = getRender(format);
  const actual = render(result);
  return actual;
};
