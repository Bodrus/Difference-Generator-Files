import _ from 'lodash';

const getKeysFromObjects = (after, before) => _.union(_.keys(after), _.keys(before));

// Вычисления делаются сразу для всех возможных типов
// И это тут повезло что оно все отработает, но концептуально так неверно.
// Код конкретной ноды должен строится только тогда когда перед нами нужная нода.

const getAst = (before, after) => {
  const buildAst = (key) => {

    const getStructureAst = {
      added: {
        type: 'added', key, beforeValue: '', afterValue: after[key],
      },
      changed: {
        type: 'changed', key, beforeValue: before[key], afterValue: after[key],
      },
      deleted: {
        type: 'deleted', key, beforeValue: before[key], afterValue: '',
      },
      unchaged: {
        type: 'unchanged', key, beforeValue: before[key], afterValue: after[key],
      },
      tagList: {
        type: 'tagList', key, children: [],
      },
    };

    const buildNode = type => getStructureAst[type];


    if (_.has(after, key) && _.has(before, key)) {
      if (before[key] instanceof Object && after[key] instanceof Object) {
        return {
          type: 'taglist', key, children: getAst(before[key], after[key]),
        };
      } if (before[key] === after[key]) {
        return buildNode('unchaged');
      }
      return buildNode('changed');
    } if (_.has(after, key) && !_.has(before, key)) {
      return buildNode('added');
    }
    return buildNode('deleted');
  };

  const keys = getKeysFromObjects(after, before);
  const ast = keys.map(buildAst);

  return ast;
};

export default getAst;
