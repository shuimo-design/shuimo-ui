/**
 * @Description: 抽屉组件
 * @Author: 菩萨蛮
 * @Date: 2021/8/24 11:27 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


import { h, defineComponent, Teleport } from 'vue';
import WBorder from "../../other/border/WBorder";
import { CLOSE_EVENT, CONFIRM_EVENT } from "../../dependents/_utils/constants";
import DialogHandler from "../../dependents/_composables/DialogHandler";

export default defineComponent({
  name: 'WDrawer',
  props: {
    width: { type: String, default: '524px' },
    mask: { type: Object, default: { show: true, clickClose: false } },
    visible: { type: Boolean, default: false },
  },
  emits: [CLOSE_EVENT, CONFIRM_EVENT],
  setup(props, context) {
    const { pes, maskClass, resetSize, maskClick, closeDialog } = DialogHandler(props, context);
    return { pes, maskClass, resetSize, maskClick, closeDialog };
  },
  render(ctx: any) {
    const { visible, closeDialog } = this;

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
      class: this.maskClass,
      onClick: (event: Event) => {
        closeDialog();
      }
    }, borderWrap);

    return h(Teleport, { to: 'body' }, maskWrap);
  }
})
