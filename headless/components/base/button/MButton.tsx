/**
 * @description headless button
 * @author 阿怪
 * @date 2024/12/16 09:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { ButtonCore } from '@shuimo-design/ui-core';
import { ButtonProps } from '@shuimo-design/ui-core/components/base/button/props';
import './button.css';

const { props, useButton } = ButtonCore;

export default defineComponent((props: ButtonProps, ctx) => {
  return () => {
    const { domType, slot, domProps } = useButton(props, ctx);
    return h(domType, domProps, slot);
  };
}, {
  name: 'MButton',
  props,
});
