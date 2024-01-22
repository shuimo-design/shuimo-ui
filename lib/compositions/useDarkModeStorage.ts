/**
 * @description dark mode storage hook
 * @author 阿怪
 * @date 2024/1/23 01:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { ref, watch } from 'vue';

const SHUIMO_DARK_MODE_KEY = 'shuimo-dark-mode';

export default function useDarkModeStorage(storageKey = SHUIMO_DARK_MODE_KEY) {

  const darkModeRef = ref(false);

  const initDarkMode = () => {
    if (window) {
      const darkMode = localStorage.getItem(storageKey);
      if (darkMode) {
        darkModeRef.value = darkMode === 'true';
        return false;
      }
      return true;
    }
    return false;
  };

  watch(() => darkModeRef.value, (value) => {
    localStorage.setItem(storageKey, value.toString());
  });


  return {
    darkModeRef,
    initDarkMode
  };
}
