import _ from 'lodash';

const printObl = (obj) => {
  if (!(obj instanceof Object)) {
    return obj;
  }
  const keys = Object.keys(obj);
  const parseObj = keys.map(el => `{\n         ${el}: ${obj[el]}\n}`);
  return parseObj;
};


const buildDIF = {
  // taglist: arg => `${arg.key}: {\n ${build(arg.children)}`,
  added: arg => `+ ${arg.key}: ${printObl(arg.afterValue)}`,
  deleted: arg => `- ${arg.key}: ${printObl(arg.beforeValue)}`,
  changed: (arg) => {
    const before = [`- ${arg.key}: ${arg.beforeValue}\n`];
    const after = [`+ ${arg.key}: ${arg.afterValue}`];
    return _.flatten([before, after]);
  },
  unchanged: arg => `  ${arg.key}: ${printObl(arg.beforeValue)}`,
};

const getBuilder = key => buildDIF[key];

const build = ast => ast.map(el => (el.type === 'taglist' ? `${el.key}: {\n ${build(el.children)}` : `${getBuilder(el.type)(el)}`)).join('\n');

export default build;
