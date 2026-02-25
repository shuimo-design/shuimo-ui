/**
 * @description headless dark mode storage hook
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 使用 localStorage 持久化暗色模式偏好。
 * 用法示例：
 *   const { darkModeRef, initDarkMode } = useDarkModeStorage();
 *   // 将 initDarkMode 作为 initHandler 传入 MDarkMode
 */
import { ref, watch } from 'vue';

const SHUIMO_DARK_MODE_KEY = 'shuimo-dark-mode';

export default function useDarkModeStorage(storageKey = SHUIMO_DARK_MODE_KEY) {
  const darkModeRef = ref(false);

  /**
   * 从 localStorage 读取暗色模式偏好并初始化。
   * 若读取到已存储的值则使用存储值并返回 false（不需要自动检测）。
   * 若无存储记录则返回 true（交由 autoMode 做系统偏好检测）。
   */
  const initDarkMode = (): boolean => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        darkModeRef.value = stored === 'true';
        // 已有存储值，不需要自动初始化
        return false;
      }
      // 无存储值，告知调用方可以自动初始化
      return true;
    }
    return false;
  };

  // 监听状态变化，自动写入 localStorage
  watch(darkModeRef, (value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, value.toString());
    }
  });

  return {
    darkModeRef,
    initDarkMode,
  };
}
