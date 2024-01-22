/**
 * @description vue version loading
 * @author 阿怪
 * @date 2022/8/25 11:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { useLoading } from './useLoading.ts';
import { props } from './api.ts';

export default defineComponent((props, { slots }) => {
  const loadingRef = ref<HTMLElement>();

  const { getStyle } = useLoading();

  return () => {
    return <div class={['m-loading', { 'm-loading-mask': props.mask }]}
                style={getStyle(props)} ref={loadingRef}>
      <div class="m-loading-wrapper">
        <div class="m-loading-main"></div>
      </div>
    </div>;
  };
}, {
  name: 'MLoading',
  props
});
