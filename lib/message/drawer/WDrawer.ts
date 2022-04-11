/**
 * @description 抽屉组件
 * @author 阿怪
 * @date 2021/8/24 11:27 上午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.0.1 添加drawerClass数组字段
 */


import { h, defineComponent, Teleport } from 'vue';
import WBorder from "../../other/border/WBorder";
import { CLOSE_EVENT, CONFIRM_EVENT } from "../../dependents/_utils/constants";
import useDialog from "../../dependents/_composables/UseDialog";

export default defineComponent({
  name: 'WDrawer',
  props: {
    width: { type: String, default: '524px' },
    mask: { type: Object, default: { show: true, clickClose: true } },
    visible: { type: Boolean, default: false },
    drawerClass: { type: Array, default: [] }
  },
  emits: [CLOSE_EVENT, CONFIRM_EVENT],
  setup(props, context) {
    const { pes, maskClass, resetSize, maskClick, closeDialog } = useDialog(props, context);
    return { pes, maskClass, resetSize, maskClick, closeDialog };
  },
  render(ctx: any) {
    const { visible, maskClick, drawerClass } = ctx;

    if (!visible) {
      return null;
    }


    const drawerMain = h(
      'div',
      { style: { width: this.width }, class: 'w-drawer-main' },
      { default: ctx.$slots.default }
    );
    const borderWrap = h(WBorder, { class: 'w-drawer' }, () => [drawerMain]);

    const maskWrap = h('div', {
      class: [...this.maskClass, ...drawerClass],
      onClick: maskClick
    }, borderWrap);

    return h(Teleport, { to: 'body' }, maskWrap);
  }
})
