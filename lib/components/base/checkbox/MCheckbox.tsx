/**
 * @description MCheckbox
 * @author youus
 * @date 2022/4/7 00:01
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 修复checkbox的slot支持
 * v2.0.0 阿怪 upgrade to core version
 * v2.0.1 阿怪 support dark-mode
 * v3.0.0 阿怪 use ui-core hook
 */
import { defineComponent } from 'vue';
import { CheckboxCore } from '@shuimo-design/ui-core';
import { CheckboxProps } from '@shuimo-design/ui-core/components/base/checkbox/props';
import './checkbox.css';

const { useCheckbox, checkboxOptions } = CheckboxCore;

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
      <div class="m-checkbox-checkbox"/>
      {
        _props.indeterminate ? <div class="m-checkbox-checkbox-indeterminate"/> :
          checked.value ? <div class="m-checkbox-checkbox-inner "/> : null
      }
      {label}
    </div>;
  };
}, checkboxOptions);
