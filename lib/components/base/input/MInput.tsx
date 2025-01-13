/**
 * @description Input组件
 * @author 阿怪
 * @date 2020/11/17 22:03
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * v1.1.0 阿怪 升级为tsx版本
 * v1.1.1 阿怪 新增disabled和readonly属性
 * v1.1.2 阿怪 添加focus事件冒泡
 * v1.1.2 阿怪 添加blur事件冒泡
 * v2.0.0 阿怪 upgrade to core version
 * v2.0.1 阿怪 add input event
 * v2.0.2 阿怪 fix type sinking error
 */
import { computed, defineComponent, h } from 'vue';
import MBorder from '../../template/border/MBorder.tsx';
import './input.css';
import { InputProps } from '@shuimo-design/ui-core/components/base/input/props';
import { InputCore } from '@shuimo-design/ui-core/components/base/input';

const { useInput, props } = InputCore;

export default defineComponent((props: InputProps, { emit }) => {
  const borderClass = computed(() => ({
    class: ['m-input', { 'm-textarea': props.type === 'textarea' }, { 'm-input-disabled': props.disabled }],
  }));

  const {
    baseProps,
    inputType, onInput, onFocus, onBlur,
    inputClass,
    rowInfo,
  } = useInput(props, { emit });

  return () => {
    return h(MBorder, borderClass.value, () => h(inputType, {
      ...baseProps,
      onInput, onFocus, onBlur,
      class: inputClass,
      ...rowInfo,
    }));
  };
}, {
  name: 'MInput',
  emits: ['update:modelValue', 'focus', 'blur', 'input'],
  props,
});
