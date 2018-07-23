import st from './defaultRender';
import plain from './plainRender';

const renders = {
  st,
  plain,
};

const getRenderer = (format) => {
  const render = renders[format];
  return render;
};

export default getRenderer;
