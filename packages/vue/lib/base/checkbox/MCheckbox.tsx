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
import { cr } from '../../../tools/coreRender';

const { options: { template }, initProps } = useCheckbox();


export default defineComponent({
  name: 'MCheckbox',
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(p, { emit, slots }) {
    return () => {
      initProps({
        ...p,
        checked: p.modelValue
      }, {
        onClick: (e: MouseEvent) => {
          emit('change', e);
          emit('update:modelValue', !p.modelValue);
        }
      });

      return cr(template, {
        props: p, slots
      });
    }
  }
});
