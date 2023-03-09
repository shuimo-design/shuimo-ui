/**
 * @description vue version loading
 * @author 阿怪
 * @date 2022/8/25 11:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, onMounted } from 'vue';
import { useLoading, loadingProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MLoading',
  props: loadingProps,
  setup: (props, { slots }) => {
    const loadingRef = ref<HTMLElement>();
    const shua0Ref = ref<HTMLElement>();
    const shua1Ref = ref<HTMLElement>();
    const shua2Ref = ref<HTMLElement>();
    const shua3Ref = ref<HTMLElement>();
    const shua4Ref = ref<HTMLElement>();
    const shua5Ref = ref<HTMLElement>();
    const shua6Ref = ref<HTMLElement>();
    const shua7Ref = ref<HTMLElement>();

    const refs = {
      loadingRef,
      shua0Ref, shua1Ref, shua2Ref, shua3Ref, shua4Ref, shua5Ref, shua6Ref, shua7Ref
    }
    const { getTemplate, onMountedHook } = useLoading();
    onMounted(async () => {
      await onMountedHook({ ...props, ...refs });
    });

    return () => {
      return cr(getTemplate({
        props,
        ref: refs
      }), { slots });
    };
  }
});
