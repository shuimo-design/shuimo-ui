/**
 * @description use select fetch hook
 * @author 阿怪
 * @date 2023/7/24 10:56
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SelectProps } from './index';
import useContainerObserver from '../../../compositions/virtualList/useContainerObserver.ts';
import { ref, watch } from 'vue';
import { Options } from '../../../compositions/common/defineCore.ts';

type TODOType = any
export default function useSelectFetch(options: Options<{
  props: SelectProps,
}>) {

  const lastOptionRef = ref<TODOType>(null);
  const selectOptionRef = ref(null);
  const fetchLoadingRef = ref(false);


  watch(() => lastOptionRef, () => {
    if (lastOptionRef.value?.$el) {
      reObserve(lastOptionRef.value.$el);
    }
  });

  const callback = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // touch bottom
      fetchLoadingRef.value = true;
      if (options.props.needFetch) {
        await options.props.fetch?.();
      }
      fetchLoadingRef.value = false;
    }
  };

  const { reObserve } = useContainerObserver({
    containerRef: selectOptionRef,
    callback,
    threshold: 1,
    getTarget: () => {
      return lastOptionRef.value?.$el;
    }
  });


  return {
    lastOptionRef,
    selectOptionRef,
    fetchLoadingRef
  };

}
