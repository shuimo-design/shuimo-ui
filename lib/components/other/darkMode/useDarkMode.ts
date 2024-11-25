/**
 * @description core Dark Mode hook
 * @author 阿怪
 * @date 2023/1/31 11:14
 * @version v1.0.0-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 这个组件只是忽然兴起做的，svg和动画感觉都不太到位，代码也有很多瑕疵，后续空了以后会进行优化和迭代。
 * This component was just created suddenly. The svg and animation are not in place, and the code has many flaws. It will be optimized and iterated someday.
 */
import { ref } from 'vue';
import { DarkModeProps } from './index';

export function useDarkMode(props: DarkModeProps) {

  const getBrowserDarkMode = () => typeof window !== 'undefined' &&
    window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // 因为rice-paper组件可能会是web-component的，所以provide和getCurrentInstance都会出问题
  const isDarkRef = ref(props.modelValue ?? getBrowserDarkMode());

  let isDark = isDarkRef.value;


  const toggleDarkModeFun = (event: MediaQueryListEvent) => {
    isDark = toggleDarkMode({ modelValue: event.matches });
    return isDark;
  };

  const onMountedHook = () => {
    if (props.autoMode) {
      if (typeof window !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', toggleDarkModeFun);
        isDark = toggleDarkMode({ modelValue: getBrowserDarkMode() });
      }
    }
    isDarkRef.value = isDark;
  };

  const unmountedHook = () => {
    if (props.autoMode) {
      if (typeof window !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', toggleDarkModeFun);
      }
    }
  };

  const toggleDarkMode = (props: DarkModeProps) => {
    // set or remove dark to html
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      if (props.modelValue) {
        isDarkRef.value = true;
        htmlTag.setAttribute('dark', '');
      } else {
        isDarkRef.value = false;
        htmlTag.removeAttribute('dark');
      }
    }
    return isDarkRef.value;
  };

  return {
    isDarkRef,
    getBrowserDarkMode,
    onMountedHook,
    toggleDarkMode,
    unmountedHook,
  };

}
