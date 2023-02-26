/**
 * @description MRadio
 * @author 望海潮
 * @date 2022-03-23 18:24:55
 * @description radio单选框
 */

import { defineComponent } from 'vue';
import { radioProps, useRadio } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';

export default defineComponent({
  name: 'MRadio',
  props: {
    ...radioProps,
    value: { type: null, default: '' },
    modelValue: { type: null, default: '' }
  },
  setup(props, { emit, slots }) {
    return () => {
      const { getTemplate } = useRadio();
      return cr(getTemplate({
        props: { ...props, value: props.modelValue },
        events: {
          onClick: () => {
            emit('update:modelValue', props.modelValue === props.label ? null : props.label);
          }
        }
      }), { props });
    };
  }
});
