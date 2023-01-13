/**
 * @description
 * @author 阿怪
 * @date 2022/12/17 13:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '../../../types';
import { RicePaperProps } from './index';
import { MCOPO } from '../../../types/template/props';
import style from './ricePaper.pcss';

export default function useRicePaper() {

  const mountain: MNodeTemplate = { type: 'div', props: { class: 'm-rice-paper-mountain' } };
  const crane: MNodeTemplate = { type: 'div', props: { class: 'm-rice-paper-crane' } };
  const main: MNodeTemplate = { type: 'div', props: { class: 'm-rice-paper-main' }, slots: ['default'] };

  const template: MNodeTemplate = {
    type: 'div',
    props: { class: 'm-rice-paper' },
    children: { mountain, crane, main }
  };

  const props: MCOPO<RicePaperProps> = {
    cold: { type: Boolean, default: true },
    mountain: { type: Boolean, default: true },
    crane: { type: Boolean, default: true }
  };

  return {
    options: { template, props, style }
  };
}
