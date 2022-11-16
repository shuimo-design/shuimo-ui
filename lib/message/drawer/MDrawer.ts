/**
 * @description 抽屉组件
 * @author 阿怪
 * @date 2021/8/24 11:27 上午
 * @version v1.0.2
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.0.1 添加drawerClass数组字段
 * V1.0.1 调整代码结构为setup形式，添加内置关闭交互
 */

import { defineComponent, h, Teleport } from 'vue';
import MBorder from '../../other/border/MBorder';
import { CLOSE_EVENT, CONFIRM_EVENT } from '../../dependents/_utils/constants';
import useDialog from '../../dependents/_composables/useDialog';
import { props } from './api';
import MDialogCloseBtn from '../dialog/MDialogCloseBtn';

export default defineComponent({
  name: 'MDrawer',
  props,
  emits: [CLOSE_EVENT, CONFIRM_EVENT],
  setup(props, { slots, emit }) {
    const { maskClass, maskClick, closeDialog } = useDialog(props, { emit });

    return () => {
      const { visible, drawerClass } = props;

      if (!visible) {
        return null;
      }

      const closeBtn = props.closeBtn ? h(MDialogCloseBtn, {
        style: { 'top': `30px`, 'right': `-3px`, },
        onClick: closeDialog
      }) : undefined;

      const drawerMain = h(
        'div',
        { style: { width: props.width }, class: 'm-drawer-main' },
        { default: slots.default }
      );
      const borderWrap = h(MBorder, { class: 'm-drawer' }, () => [drawerMain]);

      const maskWrap = h('div', {
        class: [...maskClass.value, ...drawerClass],
        onClick: maskClick
      }, [borderWrap, closeBtn]);

      return h(Teleport, { to: 'body' }, maskWrap);
    };
  }
});
