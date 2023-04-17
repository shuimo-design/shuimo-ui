/**
 * @description vue version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, watch } from 'vue';
import { useDialog, dialogProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MDialog',
  props: dialogProps,
  emits: ['update:visible'],
  setup: (props, { emit, slots }) => {

    const visible = ref(props.visible);
    const handleClick = () => {
      visible.value = !visible.value;
      emit('update:visible', visible.value);
    };
    const closeDialog = () => {
      visible.value = false;
      emit('update:visible', visible.value);
    };

    watch(() => props.visible, (val) => {
      visible.value = val;
    });

    return () => {
      const { getTemplate } = useDialog({
        props: { visible },
        events: {
          handleClick,
          closeDialog
        }
      });
      return cr(getTemplate({ props }), { slots });
    };
  }
});
