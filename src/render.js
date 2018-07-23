import _ from 'lodash';


const propertyActions = [
  {
    type: 'tagList',
    func: (fn, arg, recurse, deep) => [`  ${arg.key}: {\n${recurse(arg.children, deep)}`, '  }'],
  },
  {
    type: 'changed',
    func: (fn, arg) => [`- ${arg.key}: ${fn(arg.beforeValue)}`, `+ ${arg.key}: ${fn(arg.afterValue)}`],

  },
  {
    type: 'unchanged',
    func: (fn, arg) => `  ${arg.key}: ${fn(arg.beforeValue)}`,
  },
  {
    type: 'added',
    func: (fn, arg) => `+ ${arg.key}: ${fn(arg.afterValue)}`,
  },
  {
    type: 'deleted',
    func: (fn, arg) => `- ${arg.key}: ${fn(arg.beforeValue)}`,
  },
];


const renderToString = (ast, deep = 0) => {
  const counterIndentation = (str) => {
    const spacesCounter = (deep * 4) + 2;
    return `${' '.repeat(spacesCounter)}${str}`;
  };

  const printObl = (el) => {
    if (!(el instanceof Object)) {
      return el;
    }
    const keys = Object.keys(el);
    const indentation = [keys.map(elem => `${' '.repeat(6)}${elem}: ${el[elem]}`), '  }'];
    const result = indentation.map(counterIndentation);
    return `{\n${result.join('\n')}`;
  };

  const buildString = (data) => {
    const { func } = propertyActions.find(({ type }) => type === data.type);
    return func(printObl, data, renderToString, deep + 1);
  };

  const result = ast.map(buildString);
  const addSpaces = _.flatten(result).map(counterIndentation);
  return addSpaces.join('\n');
};

const render = data => `{\n${renderToString(data)}\n}`;

export default render;
