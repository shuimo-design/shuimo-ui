/**
 * @description radio group
 * @author 阿怪
 * @date 2024/11/1 15:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent, h } from 'vue';
import { RadioGroupProps, RadioProps } from './index';
import { radioGroupProps } from './api.ts';
import MRadio from './MRadio.tsx';

export default defineComponent((props: RadioGroupProps, { emit, slots }) => {


  return () => {

    const radioGroups = slots.default?.().map(node => {
      if (node.type === MRadio) {
        const radioProps: RadioProps = {};
        if (props.name) {
          radioProps.name = props.name;
        }

        if (props.modelValue) {
          radioProps.modelValue = props.modelValue;
        }

        return h(node, {
          ...radioProps,
          'onUpdate:modelValue': (value: any) => {
            emit('update:modelValue', value);
          },
          ...node.props,
        });
      }
      return node;
    });


    return <div class="m-radio-group">
      {radioGroups}
    </div>;
  };

}, {
  name: 'MRadioGroup',
  props: radioGroupProps,
  emits: ['change', 'update:modelValue'],
});
