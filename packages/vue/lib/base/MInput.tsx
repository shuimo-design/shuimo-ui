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
import { props } from '@shuimo-design/core/lib/base/input/api';
import { HTMLElementEvent } from '@shuimo-design/types';
import MBorder from '../template/border/MBorder';

export default defineComponent({
  name: 'MInput',
  emits: ['update:modelValue', 'focus', 'blur', 'input'],
  props: {
    ...props,
    modelValue: { type: [String, Number], default: '' }
  },
  setup(props, { emit }) {

    const borderClass = computed(() => ({
      class: ['m-input', { 'm-textarea': props.type === 'textarea' }, { 'm-input-disabled': props.disabled }]
    }));
    return () => {
      const isInput = props.type !== 'textarea';

      return h(MBorder, borderClass.value, () => h(!isInput ? 'textarea' : 'input', {
        autofocus: props.autofocus,
        value: props.modelValue,
        placeholder: props.placeholder,
        disabled: props.disabled,
        type: props.type,
        readOnly: props.readonly,
        onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
          emit('update:modelValue', e.target.value);
          emit('input', e.target.value);
        },
        onFocus: (e: FocusEvent) => {
          emit('focus', e);
        },
        onBlur: (e: FocusEvent) => {
          emit('blur', e);
        },
        class: isInput ? 'm-input-inner' : 'm-textarea-inner',
        ...(isInput ? {} : { rows: 10 })
      }));
    };
  }
});
