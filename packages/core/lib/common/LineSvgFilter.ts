/**
 * @description shuimo line svg filter
 * @author 阿怪
 * @date 2022/12/11 03:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


const createElement = (name: string, props?: Record<string, string>) => {
  const tag = document.createElement(name);
  if (props) {
    Object.keys(props).forEach(key => {
      tag.setAttribute(key, props[key]);
    });
  }
  return tag;
};

const svgInit = () => {
  const svgFilter = createElement('svg', { width: '0', height: '0' });
  const filter = createElement('filter', { id: 'm-line-filter' });
  const feTurbulence = createElement('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.02', numOctaves: '2' });
  const feDisplacementMap = createElement('feDisplacementMap', { in: 'SourceGraphic', in2: 'noise', scale: '9' });
  const feGaussianBlur = createElement('feGaussianBlur', { in: 'noise', stdDeviation: '0.9' });
  filter.append(feTurbulence, feDisplacementMap, feGaussianBlur);
  svgFilter.appendChild(filter);
  return svgFilter;
};


export const LineSvgFilter = () => {

  return svgInit();
};
