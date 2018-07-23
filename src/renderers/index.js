import standart from './standart';
import plain from './plain';

const renderers = {
  standart,
  plain,
  json: JSON.stringify,
};

const getRenderer = (format) => {
  const render = renderers[format];
  return render;
};

export default getRenderer;
