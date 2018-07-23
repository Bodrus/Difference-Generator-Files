import _ from 'lodash';

const getKeysFromObjects = (after, before) => _.union(_.keys(after), _.keys(before));

// Вычисления делаются сразу для всех возможных типов
// И это тут повезло что оно все отработает, но концептуально так неверно.
// Код конкретной ноды должен строится только тогда когда перед нами нужная нода.

const propertyActions = [
  {
    type: 'tagList',
    check: (beforeObj, afterObj, publicKey) => ((beforeObj[publicKey] instanceof Object)
       && (afterObj[publicKey] instanceof Object)),
    fn: (before, after, fn) => ({ children: fn(before, after) }),
  },
  {
    type: 'added',
    check: (beforeObj, afterObj, publicKey) => ((_.has(afterObj, publicKey))
      && (!_.has(beforeObj, publicKey))),
    fn: (before, after) => ({ beforeValue: '', afterValue: after }),
  },
  {
    type: 'deleted',
    check: (beforeObj, afterObj, publicKey) => ((!_.has(afterObj, publicKey))
      && (_.has(beforeObj, publicKey))),
    fn: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
  {
    type: 'changed',
    check: (afterObj, beforeObj, key) => (_.has(beforeObj, key) && _.has(afterObj, key))
                                        && (beforeObj[key] !== afterObj[key]),
    fn: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
  {
    type: 'unchanged',
    check: (beforeObj, afterObj, publicKey) => (((_.has(afterObj, publicKey))
       && _.has(beforeObj, publicKey)) && (afterObj[publicKey] === beforeObj[publicKey])),
    fn: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
];


const getAst = (before, after) => {
  const buildAstNode = (publicKey) => {
    // const { type, fn } = getPropertyAction(publicKey);
    const { type, fn } = propertyActions.find(({ check }) => check(before, after, publicKey));

    return ({ type, key: publicKey, ...fn(before[publicKey], after[publicKey], getAst) });
  };

  const keys = getKeysFromObjects(after, before);
  const ast = keys.map(buildAstNode);

  return ast;
};


export default getAst;
