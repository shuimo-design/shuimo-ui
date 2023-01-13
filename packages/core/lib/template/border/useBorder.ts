/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 13:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../types';
import style from './border.pcss';

export default function useBorder(children?: Record<string, MNodeTemplate>) {


  const baseLineClass = 'm-border-line';

  enum lineType {
    top = 'top',
    left = 'left',
    right = 'right',
    bottom = 'bottom'
  }

  const main: MNodeTemplate = { type: 'div', props: { class: 'm-border-main' } };
  if (!children) {
    main.slots = ['default'];
  } else {
    main.children = children;
  }

  const template: MNodeTemplate = {
    type: 'div',
    props: { class: 'm-border' },
    children: {
      main
    }
  };

  Object.keys(lineType).forEach(type => {
    template.children![type] = {
      type: 'div', props: { class: [baseLineClass, `m-border-${type}-line`] }
    };
  });

  return { options: { template, style } };
}
