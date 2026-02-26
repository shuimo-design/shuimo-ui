/**
 * @description headless dark mode 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.1.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 无样式版本，消费者通过 default slot 传入自定义图标/内容。
 * 未传 slot 时渲染简单的文字按钮（"Dark" / "Light"）。
 */
import { defineComponent } from 'vue';
import { DarkModeCore } from '@shuimo-design/ui-core';
import { DarkModeProps } from '@shuimo-design/ui-core/components/other/darkMode/props';
import './darkMode.css';

const { props, useDarkMode } = DarkModeCore;

export default defineComponent((rawProps: DarkModeProps, _ctx: any) => {
  const { slots, emit } = _ctx;
  // emit 类型宽化为 any，与 useDarkMode 的 ctx 参数兼容
  const emitCtx = { emit: emit as (event: string, ...args: any[]) => void };

  const { isDark, toggle } = useDarkMode(rawProps, emitCtx);

  return () => (
    <div class="m-dark-mode" onClick={toggle}>
      {slots.default
        ? slots.default({ isDark: isDark.value })
        : <span>{isDark.value ? 'Dark' : 'Light'}</span>
      }
    </div>
  );
}, {
  name: 'MDarkMode',
  props,
  emits: ['update:modelValue', 'change'],
});
