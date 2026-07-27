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
 * v2.0.3 原生属性转发到内层 input（此前停在 MBorder 的 div 上）
 */
import { computed, defineComponent, h } from 'vue';
import MBorder from '../../template/border/MBorder.tsx';
import './input.css';
import { InputProps } from '@shuimo-design/ui-core/components/base/input/props';
import { InputCore } from '@shuimo-design/ui-core/components/base/input';

const { useInput, props } = InputCore;

export default defineComponent((props: InputProps, { emit, attrs }) => {
  const borderClass = computed(() => ({
    class: ['m-input', { 'm-textarea': props.type === 'textarea' }, { 'm-input-disabled': props.disabled }],
  }));

  const {
    renderInit,
    inputType, onInput, onFocus, onBlur,
    inputClass,
    rowInfo,
  } = useInput(props, { emit });

  return () => {

    const { baseProps } = renderInit();

    // class / style 仍然落在外层边框上（保持原有行为），
    // 其余原生属性（autocomplete、name、maxlength、aria-* 等）转发给真正的 input：
    // 否则它们会停在 MBorder 的 div 上，浏览器的自动填充和辅助技术都读不到。
    const { class: attrClass, style: attrStyle, ...nativeAttrs } = attrs;

    return h(MBorder, { class: [borderClass.value.class, attrClass], style: attrStyle }, () => h(inputType, {
      ...baseProps,
      ...nativeAttrs,
      onInput, onFocus, onBlur,
      class: inputClass,
      ...rowInfo,
    }));
  };
}, {
  name: 'MInput',
  inheritAttrs: false,
  emits: ['update:modelValue', 'focus', 'blur', 'input'],
  props,
});

