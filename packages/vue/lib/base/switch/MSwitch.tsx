/**
 * @description 开关组件
 * @author 阿怪
 * @date 2022/8/16 23:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * modelValue不为布尔值的时候暂时不冒泡，里面的逻辑不太清晰，后续可以扩展一下
 */
import { defineComponent } from 'vue';
import { switchProps, useSwitch } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';

export default defineComponent({
  name: 'MSwitch',
  emits: ['update:modelValue', 'change'],
  props: {
    ...switchProps,
    value: { type: null, default: '' },
    modelValue: { type: null, default: '' }
  },
  setup(props, { emit, slots }) {
    return () => {
      const { getTemplate } = useSwitch();
      return cr(getTemplate({
        props: { ...props, value: props.modelValue },
        events: {
          onClick: () => {
            emit('update:modelValue', !props.modelValue);
          }
        }
      }), { props });
    };
  }
});
