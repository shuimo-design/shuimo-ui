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
 */
import { defineComponent } from 'vue';
import { inputProps, useInput } from '@shuimo-design/core';
import { HTMLElementEvent } from '@shuimo-design/types';
import { cr } from '../../tools/coreRender';


export default defineComponent({
  name: 'MInput',
  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    ...inputProps,
    modelValue: { type: String, default: '' } // todo universalization
  },
  setup(props, { emit }) {

    return () => {
      const { getTemplate } = useInput();
      return cr(getTemplate({
        props: { ...props, value: props.modelValue },
        events: {
          onInput: (e: HTMLElementEvent<HTMLInputElement>) => {emit('update:modelValue', e.target.value);},
          onFocus: (e: FocusEvent) => {emit('focus', e);},
          onBlur: (e: FocusEvent) => {emit('blur', e);}
        }
      }), { props });
    };
  }
});
