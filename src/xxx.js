const buildAllTags = arg => `{type: ${arg.type}, key: ${arg.key}, beforeValue: ${arg.beforeValue}, afterValue: ${arg.afterValue}}\n`;
const buildTAGLIST = arg => `{type: ${arg.type}, key: ${arg.key}, children: [\n      ${build(arg.children)} }`;

const buildDIF = {
  taglist: arg => buildTAGLIST(arg),
  added: arg => buildAllTags(arg),
  deleted: arg => buildAllTags(arg),
  changed: arg => buildAllTags(arg),
  unchaged: arg => buildAllTags(arg),
};

const getBuilder = key => buildDIF[key];


const build = buildHtml => String(buildHtml.map(el => `${getBuilder(el.type)(el)}`));


export default build;
