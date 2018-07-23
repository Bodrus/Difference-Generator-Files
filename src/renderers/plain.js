
const nodeType = [
  {
    type: 'tagList',
    func: (arg, acc, fn, recursFn) => `${recursFn(arg.children, `${acc}${arg.key}.`)}`,
  },
  {
    type: 'changed',
    func: (arg, acc, fn) => `Property '${acc}${arg.key}' was updated from ${fn(arg.beforeValue)} to ${fn(arg.afterValue)}`,
  },
  {
    type: 'unchanged',
    func: (arg, acc) => `Property '${acc}${arg.key}' do not change`,
  },
  {
    type: 'added',
    func: (arg, acc, fn) => `Property '${acc}${arg.key}' was added with value: ${fn(arg.afterValue)}`,
  },
  {
    type: 'deleted',
    func: (arg, acc) => `Property '${acc}${arg.key}' was removed`,
  },
];

const printObl = (elem) => {
  if (elem instanceof Object) {
    return 'complex value';
  }
  return elem;
};

const createStr = (ast, acc = '') => {
  const buildStr = (elem) => {
    const { func } = nodeType.find(({ type }) => type === elem.type);
    return func(elem, acc, printObl, createStr);
  };

  return ast.map(buildStr).join('\n');
};

const plainRender = data => createStr(data);

export default plainRender;
