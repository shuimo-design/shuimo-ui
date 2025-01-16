/**
 * @description headless checkbox
 * @author 阿怪
 * @date 2024/12/24 11:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { CheckboxCore } from '@shuimo-design/ui-core';
import { CheckboxProps } from '@shuimo-design/ui-core/components/base/checkbox/props';

const { useCheckbox, props, checkboxOptions } = CheckboxCore;

export default defineComponent((_props: CheckboxProps, ctx) => {
  const {
    checked,
    onClick,
    renderInit,
  } = useCheckbox(_props as Required<CheckboxProps>, ctx);

  return () => {
    const {
      label,
      input,
      checkboxClass,
    } = renderInit();

    return <div class={checkboxClass} onClick={onClick}>
      {input}
      {label}
    </div>;
  };
}, checkboxOptions);
