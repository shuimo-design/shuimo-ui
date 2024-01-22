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
import { DarkModeProps } from './index';

export function useDarkMode(autoMode: boolean) {

  const getBrowserDarkMode = () => typeof window !== 'undefined' &&
    window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const onMountedHook = () => {
    // todo add event remove
    if(autoMode) {
      if (typeof window !== 'undefined') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
          toggleDarkMode({ modelValue: event.matches });
        });
        toggleDarkMode({ modelValue: getBrowserDarkMode() });
      }
    }
  };

  const toggleDarkMode = (props: DarkModeProps) => {
    // set or remove dark to html
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      if (props.modelValue) {
        htmlTag.setAttribute('dark', '');
      } else {
        htmlTag.removeAttribute('dark');
      }
    }
  };

  return {
    getBrowserDarkMode,
    onMountedHook,
    toggleDarkMode
  };

}
