/**
 * @description core Tai Chi hook
 * @author 阿怪
 * @date 2023/1/31 11:14
 * @version v1.0.0-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 这个组件只是忽然兴起做的，svg和动画感觉都不太到位，代码也有很多瑕疵，后续空了以后会进行优化和迭代。
 * This component was just created suddenly. The svg and animation are not in place, and the code has many flaws. It will be optimized and iterated someday.
 */
import { TaiChiSvg } from './TaiChiSvg';
import style from './TaiChi.pcss';
import { TaiChiEvents, TaiChiProps } from './index';
import { MCOPO } from '@shuimo-design/types';


export const taiChiProps: MCOPO<TaiChiProps> = {
  modelValue: { type: Boolean, required: true },
  value: { type: Boolean, required: true }
};

export function useTaiChi() {


  const svg = TaiChiSvg;

  const template = <div class="m-tai-chi">
    {svg}
  </div>;


  const initProps = (props: TaiChiProps, event: TaiChiEvents) => {

    if (!template.props) {return;}
    template.initProps!(taiChiProps, props);
    if (template.props.value) {
      template.props.class = 'm-tai-chi';
    } else {
      template.props.class = 'm-tai-chi dark';
    }
    template.props.onClick = (e: MouseEvent) => {
      event.onClick(e);
    };
  };

  return {
    options: { template, props: taiChiProps, style },
    initProps
  };

}
