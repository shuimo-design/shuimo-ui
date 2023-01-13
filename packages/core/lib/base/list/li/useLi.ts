/**
 * @description shuimo li core hook
 * @author 阿怪
 * @date 2023/1/4 11:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../../types';
import { MCOPO } from '../../../../types/template/props';
import { LiProps } from './li';
import style from './li.pcss';

export default function useLi() {

  const template: MNodeTemplate = {
    type: 'li',
    props: { class: 'm-li' },
    slots: ['default']
  };

  const props: MCOPO<LiProps> = {
    active: { type: Boolean, default: false }
  };

  return { options: { template, props, style } };
}
