

const printObl = (obj) => {
  if (obj instanceof Object) {
    const keys = Object.keys(obj);
    return keys.map(el => `{\n       ${el}: ${obj[el]}\n}`);
  }
  return obj;
};


const buildTAGLIST = arg => `${arg.key}: {\n ${build(arg.children)}\n}`;
const buildAddedTags = arg => `+ ${arg.key}: ${printObl(arg.afterValue)}\n`;
const buildDeletedTags = arg => `- ${arg.key}: ${printObl(arg.beforeValue)}\n`;
const builUnchangetTags = arg => `  ${arg.key}: ${arg.beforeValue}\n`;
const buildChangedTags = arg => `+ ${arg.key}: ${printObl(arg.afterValue)}\n- ${arg.key}: ${arg.beforeValue}\n`;

const buildDIF = {
  taglist: arg => buildTAGLIST(arg),
  added: arg => buildAddedTags(arg),
  deleted: arg => buildDeletedTags(arg),
  changed: arg => buildChangedTags(arg),
  unchaged: arg => builUnchangetTags(arg),
};

const getBuilder = key => buildDIF[key];


const build = buildHtml => String(buildHtml.map(el => `${getBuilder(el.type)(el)}`));


export default build;
