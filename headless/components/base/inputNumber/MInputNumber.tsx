/**
 * @description headless inputNumber 组件
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { InputNumberCore } from '@shuimo-design/ui-core';
import useInputNumber from '@shuimo-design/ui-core/components/base/inputNumber/useInputNumber.ts';
import { InputNumberProps } from '@shuimo-design/ui-core/components/base/inputNumber/props';
import './inputNumber.css';

export default defineComponent((_props: InputNumberProps, ctx) => {
  const props = _props as Required<InputNumberProps>;

  const {
    currentValue,
    handleInputChange,
    handleInputBlur,
  } = useInputNumber(props, ctx);

  return () => {
    return <div class="m-input m-input-number">
      <input
        class="m-input-inner"
        type="text"
        value={currentValue.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readonly={props.readonly}
        onInput={handleInputChange as any}
        onBlur={handleInputBlur}
      />
    </div>;
  };
}, {
  name: 'MInputNumber',
  props: InputNumberCore.props,
  emits: ['update:modelValue', 'change'],
});
