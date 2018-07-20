import _ from 'lodash';

const getKeysFromObjects = (after, before) => _.union(_.keys(after), _.keys(before));


const getAst = (before, after) => {
  const buildAst = (key) => {
    const getStructureAst = {
      added: {
        type: 'added', key, beforeValue: '', afterValue: after[key], children: [],
      },
      chenged: {
        type: 'changed', key, beforeValue: before[key], afterValue: after[key], children: [],
      },
      deleted: {
        type: 'deleted', key, beforeValue: before[key], afterValue: '', children: [],
      },
      uncheged: {
        type: 'uncheged', key, beforeValue: before[key], afterValue: after[key], children: [],
      },
    };


    if (before[key] instanceof Object && after[key] instanceof Object) {
      return {
        type: 'unchanged', key, beforeValue: '', afterValue: '', children: getAst(before[key], after[key]),
      };
    }
    if (_.has(after, key) && !_.has(before, key)) {
      return getStructureAst.added;
    }
    if (_.has(after, key) && _.has(before, key)) {
      if (before[key] === after[key]) {
        return getStructureAst.uncheged;
      }
      return getStructureAst.changed;
    }
    return getStructureAst.deleted;
  };


  const keys = getKeysFromObjects(after, before);
  const ast = keys.reduce((acc, key) => [...acc, buildAst(key)], []);
  console.log(ast);
  return ast;
};

export default getAst;
