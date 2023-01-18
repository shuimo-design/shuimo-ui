/**
 * @description MCheckbox
 * @author youus
 * @date 2022/4/7 00:01
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 修复checkbox的slot支持
 */

import { defineComponent } from 'vue';
import { useCheckbox } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';

const { options: { props, template } } = useCheckbox();

export default defineComponent({
  name: 'MCheckbox',
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    return () => cr(template, slots);
  }
});
