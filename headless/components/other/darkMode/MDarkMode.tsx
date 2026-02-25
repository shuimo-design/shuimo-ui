/**
 * @description headless dark mode 组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 无样式版本，消费者通过 slot 传入自定义图标/内容。
 */
import { defineComponent } from 'vue';
import { DarkModeCore } from '@shuimo-design/ui-core';
import { DarkModeProps } from '@shuimo-design/ui-core/components/other/darkMode/props';
import './darkMode.css';

const { props, useDarkMode } = DarkModeCore;

export default defineComponent((rawProps: DarkModeProps, ctx) => {
  const props = rawProps as Required<DarkModeProps>;
  const { slots } = ctx;

  const { toggle } = useDarkMode(props, ctx);

  return () => (
    <div class="m-dark-mode" onClick={toggle}>
      {slots.default?.()}
    </div>
  );
}, {
  name: 'MDarkMode',
  props,
  emits: ['update:modelValue', 'click'],
});
