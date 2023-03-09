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
import { TaiChiEvents, TaiChiProps } from './index';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultProps from '../../../composition/useDefaultProps';

const style = await import('./TaiChi.pcss');

export const taiChiProps: MCOPO<TaiChiProps> = {
  modelValue: { type: Boolean, required: true },
  value: { type: Boolean, required: true }
};

export function useTaiChi() {
  const svg = TaiChiSvg;

  const onMountedHook = (props: TaiChiProps) => {
    // set or remove dark to html
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      if (props.value) {
        htmlTag.setAttribute('dark', '');
      } else {
        htmlTag.removeAttribute('dark');
      }
    }
  };

  const clickHandler = (e: MouseEvent, props: TaiChiProps, event: TaiChiEvents) => {
    event.onClick?.(e);
    onMountedHook(props);
  };

  const getTemplate = (options?: {
    props?: TaiChiProps,
    events?: TaiChiEvents
  }): MNodeTemplate => {
    const { props: _props, events: _events } = options ?? {};
    const props = useDefaultProps(taiChiProps, _props);
    const events = _events ?? {};
    return <div class="m-tai-chi"
                onClick={(e: MouseEvent) => clickHandler(e, props, events)}>
      {svg}
    </div>;
  };

  return {
    options: { props: taiChiProps, style },
    getTemplate,
    onMountedHook
  };

}
