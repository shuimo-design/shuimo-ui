/**
 * @description common loading component
 * @author 阿怪
 * @date 2025/1/22 16:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { LoadingProps } from './props';
import { LoadingCore } from './index.ts';

const { loadingOptions, useLoading } = LoadingCore;

export default defineComponent((_props:LoadingProps, ctx) => {
  const { renderInit } = useLoading(_props, ctx);

  return ()=>{
    const {
      loadingClass, loadingStyle,
      indicator
    } = renderInit();
    return <div class={loadingClass} style={loadingStyle.value}>
      <div class="m-loading-wrapper">
        {indicator}
        {ctx.slots.default?.()}
      </div>
    </div>
  }

}, loadingOptions)
