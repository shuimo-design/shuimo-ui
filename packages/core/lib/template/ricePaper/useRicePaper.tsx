/**
 * @description
 * @author 阿怪
 * @date 2022/12/17 13:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '../../../types';
import { RicePaperProps } from './index';
import style from './ricePaper.pcss';


const ricePaperProps: MCOPO<RicePaperProps> = {
  cold: { type: Boolean, default: true },
  mountain: { type: Boolean, default: true },
  crane: { type: Boolean, default: true }
};

export function useRicePaper() {

  const template: MNodeTemplate = <div class="m-rice-paper">
    <div class="m-rice-paper-mountain" m-name="mountain"></div>
    <div class="m-rice-paper-crane" m-name="crane"></div>
    <div class="m-rice-paper-main" m-name="main">
      <slot></slot>
    </div>
  </div>;

  return {
    options: { template, props: ricePaperProps, style }
  };
}
