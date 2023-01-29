/**
 * @description shuimo li core hook
 * @author 阿怪
 * @date 2023/1/4 11:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiProps } from './li';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './li.pcss';


export const liProps: MCOPO<LiProps> = {
  active: { type: Boolean, default: false }
};

export function useLi() {

  const template: MNodeTemplate = {
    type: 'li',
    props: { class: 'm-li' },
    slots: ['default']
  };

  return { options: { template, props:liProps, style } };
}
