/**
 * @description
 * @author 阿怪
 * @date 2024/12/16 09:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ButtonProps } from './props';
import { defineHook } from '../../../runtime/defineHook.ts';

export const useButton = defineHook((props: ButtonProps, { slots }) => {
  const domType = props.link ? 'a' : 'button';
  const slot = slots.default?.() ?? props.text;
  const domProps = {
    class: ['m-button', { 'm-button-disabled': props.disabled }, `m-button-${props.type}`],
    disabled: props.disabled,
  }

  return {
    domType,
    slot,
    domProps
  };
});

