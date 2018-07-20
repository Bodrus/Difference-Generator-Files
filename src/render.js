

const createString = (obj) => {
  const {
    type,
    key,
    beforeValue,
    afterValue,
  } = obj;

  if (type === 'changed') {
    const str1 = `- ${key} ${beforeValue}`;
    const str2 = `+ ${key} ${afterValue}`;
    return `${str1}\n ${str2}`;
  } if (type === 'unchaged') {
    return ` ${key} ${afterValue}`;
  } if (type === 'deleted ') {
    return `- ${key} ${beforeValue}`;
  }
  return `+ ${key} ${afterValue}`;
};

const render = (data) => {
  const result = data.reduce((acc, el) => {
    const body = createString(el);
    return [...acc, body];
  }, []);


  return result.join('\n');
};


export default render;
