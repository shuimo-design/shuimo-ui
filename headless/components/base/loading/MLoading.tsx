/**
 * @description headless loading
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { LoadingCore } from '@shuimo-design/ui-core';
import { LoadingProps } from '@shuimo-design/ui-core/components/base/loading/props';
import './loading.css';

const { props } = LoadingCore;

export default defineComponent((props: LoadingProps, { slots }) => {
  return () => {
    return <div class="m-loading" v-show={props.modelValue}>
      {slots.default?.()}
    </div>;
  };
}, {
  name: 'MLoading',
  props,
});
