

const printObl = (obj) => {
  if (obj instanceof Object) {
    const keys = Object.keys(obj);
    return keys.map(el => `{\n         ${el}: ${obj[el]}\n}`);
  }
  return obj;
};


const buildDIF = {
  taglist: arg => `${arg.key}: {\n ${build(arg.children)}`,
  added: arg => `+ ${arg.key}: ${printObl(arg.afterValue)}`,
  deleted: arg => `- ${arg.key}: ${printObl(arg.beforeValue)}`,
  changed: arg => `+ ${arg.key}: ${printObl(arg.afterValue)}\n- ${arg.key}: ${arg.beforeValue}`,
  unchaged: arg => `  ${arg.key}: ${printObl(arg.beforeValue)}`,
};
const getBuilder = key => buildDIF[key];

const build = ast => ast.map(el => `${getBuilder(el.type)(el)}`).join('\n');

export default build;
