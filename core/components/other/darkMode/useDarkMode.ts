/**
 * @description dark mode composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, watch, onMounted } from 'vue';
import { DarkModeProps } from './props';

/**
 * 将暗色模式状态同步到 document.documentElement 的 class
 */
function applyDarkClass(isDark: boolean) {
  if (typeof document === 'undefined') return;
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function useDarkMode(props: Required<DarkModeProps>, ctx: { emit: (event: string, ...args: unknown[]) => void }) {
  // 内部维护的暗色模式状态，初始值来自 modelValue
  const isDark = ref(props.modelValue);

  /**
   * 切换暗色模式
   */
  const toggle = (e?: MouseEvent) => {
    isDark.value = !isDark.value;
    ctx.emit('update:modelValue', isDark.value);
    if (e) {
      ctx.emit('click', e);
    }
  };

  // 同步外部 modelValue 变化到内部状态
  watch(
    () => props.modelValue,
    (val) => {
      if (val !== isDark.value) {
        isDark.value = val;
      }
    },
  );

  // 内部状态变化时同步 DOM class
  watch(isDark, (val) => {
    applyDarkClass(val);
  });

  onMounted(() => {
    // 优先执行 initHandler，若返回 true 则进行自动初始化
    if (props.initHandler) {
      const shouldAutoInit = props.initHandler();
      if (shouldAutoInit && props.autoMode) {
        // initHandler 返回 true 且 autoMode 开启，读取系统偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDark.value = prefersDark;
        ctx.emit('update:modelValue', isDark.value);
      }
    } else if (props.autoMode) {
      // 未提供 initHandler 时，直接根据系统媒体查询初始化
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark.value = prefersDark;
      ctx.emit('update:modelValue', isDark.value);
    }

    // 挂载时应用当前状态到 DOM
    applyDarkClass(isDark.value);
  });

  return {
    isDark,
    toggle,
  };
}
