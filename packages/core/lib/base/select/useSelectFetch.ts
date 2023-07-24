/**
 * @description use select fetch hook
 * @author 阿怪
 * @date 2023/7/24 10:56
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Options } from '../../../composition/common/defineCore';
import { RefInit, refWrapper } from '../../../composition/common/MRef';
import Effect from '../../../composition/common/effect';
import useContainerObserver from '../../../composition/virtualList/useContainerObserver';
import { SelectProps } from './index';


export default function useSelectFetch(options: Options<{
  props: SelectProps,
}>, refInit: RefInit) {

  const lastOptionRef = refWrapper(null, refInit);
  const selectOptionRef = refWrapper(null, refInit);
  const fetchLoadingRef = refWrapper(false, refInit);


  Effect.register(lastOptionRef, () => {
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
    fetchLoadingRef,
  };

}
