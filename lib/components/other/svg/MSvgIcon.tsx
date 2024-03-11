/**
 * @description vue version svg icon ( unstable! )
 * @author 阿怪
 * @date 2024/1/6 02:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent } from 'vue';
import { LI_ICON_ID } from './MSvgSymbol';
import useSvgInject from '../../../compositions/common/useSvgInject.ts';


export default defineComponent((props: {
  width?: number | string,
  height?: number | string,
  wrapperWidth?: number | string,
  wrapperHeight?: number | string,
  innerWidth?: number | string,
  innerHeight?: number | string,
  class?: string,
  wrapper?: boolean,
  inner?: boolean,
}) => {

  const { svgUrl, installIconSvg, isAuto } = useSvgInject(LI_ICON_ID);
  if (isAuto.value) {
    installIconSvg();
  }

  return () => (
    <div class={['m-svg-icon', props.class]} style={{ width: props.width, height: props.height }}>
      {props.wrapper ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.wrapperWidth} height={props.wrapperHeight}
             class="m-svg-icon-wrapper"
             viewBox="0 0 34 34">
          <use href={svgUrl}></use>
        </svg>
      ) : null}
      {props.inner ? (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.innerWidth} height={props.innerHeight}
             class="m-svg-icon-inner"
             viewBox="0 0 34 34">
          <use href={svgUrl}></use>
        </svg>
      ) : null}
    </div>
  );
}, {
  name: 'MSvgIcon',
  props: {
    width: { type: [Number, String], default: '27px' },
    height: { type: [Number, String], default: '27px' },
    wrapperWidth: { type: [Number, String], default: '22px' },
    wrapperHeight: { type: [Number, String], default: '22px' },
    innerWidth: { type: [Number, String], default: '10px' },
    innerHeight: { type: [Number, String], default: '13px' },
    class: { type: String, default: '' },
    wrapper: { type: Boolean, default: false },
    inner: { type: Boolean, default: true },
  },
});
