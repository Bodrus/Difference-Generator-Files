import st from './standart';
import plain from './plain';

const renders = {
  standart: st,
  plain,
  json: JSON.stringify,
};

const getRenderer = (format) => {
  const render = renders[format];
  return render;
};

export default getRenderer;
