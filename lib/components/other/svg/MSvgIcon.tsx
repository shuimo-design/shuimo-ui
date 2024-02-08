/**
 * @description vue version svg icon ( unstable! )
 * @author 阿怪
 * @date 2024/1/6 02:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { createApp, defineComponent, h, inject } from 'vue';
import { MShuimoConfigKey } from '../../other/config/MShuimoConfig';
import MSvgSymbol, { SVG_ID } from './MSvgSymbol';
import { MUIOption } from '../../../types/shuimo-ui';

const installIconSvg = () => {
  if (!document) {return;}
  if (!document.getElementById(SVG_ID)) {
    const svg = h(MSvgSymbol);
    const div = document.createElement('div');
    createApp({ render: () => svg }).mount(div);
    // todo use body maybe have some problem...
    document.body.appendChild(div);
  }
};
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

  const shuimoConfig = inject<MUIOption>(MShuimoConfigKey, { svgInject: 'auto' });
  const isNuxt = shuimoConfig?.svgInject === 'nuxt';
  const svgUrl = isNuxt ? `m-shuimo/icon.svg#${SVG_ID}` : `#${SVG_ID}`;
  if (shuimoConfig?.svgInject === 'auto') {
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
