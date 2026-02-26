/**
 * @description dark mode composable
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.1.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 核心约定：
 *   - 暗色模式通过 html[dark] attribute 标记（与 lib 层保持一致）
 *   - 传入 storageKey 时启用 localStorage 持久化
 *   - autoMode 时监听系统媒体查询变化，并在卸载时清理监听器
 */
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { DarkModeProps } from './props';

/** 将暗色状态同步到 html[dark] attribute */
function applyDarkAttr(isDark: boolean) {
  if (typeof document === 'undefined') return;
  const html = document.querySelector('html');
  if (!html) return;
  if (isDark) {
    html.setAttribute('dark', '');
  } else {
    html.removeAttribute('dark');
  }
}

/** 从 localStorage 读取持久化的暗色模式偏好，未找到返回 null */
function readStorage(storageKey: string): boolean | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(storageKey);
  if (stored === null) return null;
  return stored === 'true';
}

/** 将暗色模式偏好写入 localStorage */
function writeStorage(storageKey: string, isDark: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(storageKey, isDark.toString());
}

export function useDarkMode(
  props: DarkModeProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: { emit: (event: string, ...args: any[]) => void },
) {
  const isDark = ref(props.modelValue ?? false);

  /** 切换暗色模式，同步 DOM 并触发事件 */
  const toggle = () => {
    isDark.value = !isDark.value;
    ctx.emit('update:modelValue', isDark.value);
    ctx.emit('change', isDark.value);
  };

  // 监听外部 modelValue 变化，同步到内部状态
  watch(
    () => props.modelValue,
    (val) => {
      if (val !== undefined && val !== isDark.value) {
        isDark.value = val;
      }
    },
  );

  // 内部状态变化时同步 DOM 及 localStorage
  watch(isDark, (val) => {
    applyDarkAttr(val);
    if (props.storageKey) {
      writeStorage(props.storageKey, val);
    }
  });

  // 系统媒体查询变化回调
  let mediaQuery: MediaQueryList | null = null;
  const onSystemChange = (event: MediaQueryListEvent) => {
    isDark.value = event.matches;
    ctx.emit('update:modelValue', isDark.value);
    ctx.emit('change', isDark.value);
  };

  onMounted(() => {
    // 1. 若有 initHandler，优先交由外部决定是否自动初始化
    if (props.initHandler) {
      const shouldAutoInit = props.initHandler();
      if (!shouldAutoInit) {
        // initHandler 已处理好初始状态，只需同步 DOM
        applyDarkAttr(isDark.value);
        return;
      }
    } else if (props.storageKey) {
      // 2. 无 initHandler 但有 storageKey，尝试从 localStorage 读取
      const stored = readStorage(props.storageKey);
      if (stored !== null) {
        isDark.value = stored;
        applyDarkAttr(isDark.value);
        // 有存储值则不再跟随系统
        return;
      }
    }

    // 3. autoMode：跟随系统媒体查询
    if (props.autoMode && typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark.value = mediaQuery.matches;
      ctx.emit('update:modelValue', isDark.value);
      ctx.emit('change', isDark.value);
      mediaQuery.addEventListener('change', onSystemChange);
    }

    // 挂载时应用当前状态
    applyDarkAttr(isDark.value);
  });

  onUnmounted(() => {
    // 清理媒体查询监听器，防止内存泄漏
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', onSystemChange);
      mediaQuery = null;
    }
  });

  return {
    isDark,
    toggle,
    applyDarkAttr,
  };
}
