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
 */
import { defineComponent } from 'vue';
import { checkboxProps, useCheckbox } from '@shuimo-design/core';
import { HTMLElementEvent } from '@shuimo-design/types';
import { cr } from '../../../tools/coreRender';

export default defineComponent({
  name: 'MCheckbox',
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    return () => {
      const { getTemplate } = useCheckbox();
      return cr(getTemplate({
        props: { ...props, checked: props.modelValue },
        events: {
          onChange: (e: HTMLElementEvent<HTMLInputElement>) => {
            emit('change', e);
            emit('update:modelValue', !props.modelValue);
          }
        }
      }), { props, slots });
    };
  }
});
