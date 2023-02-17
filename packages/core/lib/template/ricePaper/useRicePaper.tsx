/**
 * @description
 * @author 阿怪
 * @date 2022/12/17 13:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { RicePaperProps } from './index';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './ricePaper.pcss';


export const ricePaperProps: MCOPO<RicePaperProps> = {
  cold: { type: Boolean, default: true },
  mountain: { type: Boolean, default: true },
  crane: { type: Boolean, default: true }
};

export function useRicePaper() {

  const template: MNodeTemplate = <div class="m-rice-paper">
    <div class="m-rice-paper-mountain"></div>
    <div class="m-rice-paper-crane"></div>
    <div class="m-rice-paper-main">
      <slot></slot>
    </div>
  </div>;

  const getDefaultProps = (props?: RicePaperProps) => {
    return {
      cold: props?.cold ?? true,
      mountain: props?.mountain ?? true,
      crane: props?.crane ?? true
    };
  };

  const getTemplate = (_props?: RicePaperProps):MNodeTemplate => {
    const props = getDefaultProps(_props);
    return <div class="m-rice-paper">
      {Boolean(props.mountain) ? <div class="m-rice-paper-mountain"></div> : null}
      <div class="m-rice-paper-crane"></div>
      <div class="m-rice-paper-main">
        <slot></slot>
      </div>
    </div>;
  };

  return {
    options: { template, props: ricePaperProps, style },
    getTemplate
  };
}
