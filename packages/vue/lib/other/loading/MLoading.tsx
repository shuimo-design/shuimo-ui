/**
 * @description vue version loading
 * @author 阿怪
 * @date 2022/8/25 11:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, onMounted } from 'vue';
import { props } from '@shuimo-design/core/lib/other/loading/api';
import { useLoading } from '@shuimo-design/core/lib/other/loading/useLoading';

export default defineComponent({
  name: 'MLoading',
  props,
  setup: (props, { slots }) => {
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
  }
});
