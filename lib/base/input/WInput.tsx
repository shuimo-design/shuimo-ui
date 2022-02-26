/**
 * @Description: Input组件
 * @Author: 阿怪
 * @date 2020/11/17 22:03
 * @Version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.1.0 阿怪 升级为tsx版本
 */
import { defineComponent, h } from 'vue';
import WBorder from '../../other/border/WBorder';

export default defineComponent({
  name: 'WInput',
  components: { WBorder },
  emits: ['update:modelValue'],
  props: {
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    modelValue: { type: null, default: '' }
  },
  render() {
    const { type } = this.$props;
    const domProps = {
      value: this.$props.modelValue,
      placeholder: this.$props.placeholder,
      onInput: (e: InputEvent) => {
        // @ts-ignore why EventTarget not include value?
        this.$emit('update:modelValue', e.target.value);
      }
    }

    const borderClass = { class: ['w-input', { 'w-textarea': type === 'textarea' }] };

    if (type === 'textarea') {
      return h(WBorder, borderClass, () => h(
        'textarea', {
          rows: 10,
          class: 'w-textarea-inner',
          ...domProps
        }
      ))
    }

    return h(WBorder, borderClass, () => h(
      'input', {
        type,
        class: 'w-input-inner',
        ...domProps
      }
    ))
  }
})
