/**
 * @description vue version checkbox group
 * @author 阿怪
 * @date 2023/6/6 22:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * not support duplicate value
 */

import { defineComponent, ref, watchEffect } from 'vue';
import { checkboxGroupProps } from '@shuimo-design/core/lib/base/checkbox/api';

export default defineComponent({
  name: 'MCheckboxGroup',
  props: {
    ...checkboxGroupProps,
    modelValue: checkboxGroupProps.value
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const propsRef = ref([]);
    const valuesRef = ref([]);
    const modelValuesRef = ref([]);


    watchEffect(() => {
      propsRef.value = slots.default().map(node => {
        if (node.type && node.type.hasOwnProperty('name') && (node.type as any).name === 'MCheckbox') {
          return node.props;
        }
      }).filter(e => e);
      const length = propsRef.value.length;
      modelValuesRef.value = Array.from({ length }, () => undefined);
      propsRef.value.forEach(p => {
        if (props.modelValue.includes(p.value)) {
          modelValuesRef.value[propsRef.value.indexOf(p)] = p.value;
        }
      });
    });

    const onClick = (e: any, index: number) => {
      modelValuesRef.value[index] = e;
      emit('update:modelValue', modelValuesRef.value.filter(e => e));
    };


    return () => {


      return <div class="m-checkbox-group">{slots.default?.().map((node, index) => {
        node.props.modelValue = modelValuesRef.value[index];
        node.props['onUpdate:modelValue'] = (value: any) => onClick(value, index);
        return node;
      })}</div>;
    };
  }
});
