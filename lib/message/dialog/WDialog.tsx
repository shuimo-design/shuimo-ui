/**
 * @description 弹窗组件
 * @author: 菩萨蛮
 * @date 2020/11/23 3:08 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

import { h, defineComponent, Teleport } from 'vue';
import DialogHandler from "../../dependents/_composables/DialogHandler";
import { CLOSE_EVENT, CONFIRM_EVENT } from "../../dependents/_utils/constants";

export default defineComponent({
  name: 'WDialog',
  props: {
    mask: { type: Object, default: { show: true, clickClose: true } },
    visible: { type: Boolean, default: false },
    confirmText: { type: String, default: '我知道了' }
  },
  emits: [CLOSE_EVENT, CONFIRM_EVENT],
  setup(props, context) {
    const { pes, maskClass, resetSize, maskClick, closeDialog } = DialogHandler(props, context);
    return { pes, maskClass, resetSize, maskClick, closeDialog };
  },
  computed: {
    baseStyle() {
      const baseH = 236, baseW = 368, basePaddingTop = 70, basePaddingSide = 35;
      const { pes } = this;
      return {
        'padding-top': `${basePaddingTop * pes}px`,
        'padding-left': `${basePaddingSide * pes}px`,
        'padding-right': `${basePaddingSide * pes}px`,
        'height': `${baseH * pes}px`,
        'width': `${baseW * pes}px`,
      }
    },
    closeBtnBaseStyle() {
      const top = 41, left = 427;
      const { pes } = this;
      return {
        'top': `${top * pes}px`,
        'left': `${left * pes - 23}px`,
      }
    }
  },
  render() {
    const classes = this.maskClass;
    const { visible, mask } = this;
    const { maskClick, closeDialog } = this;
    if (!visible) {
      return null;
    }
    const { resetSize } = this;
    this.$nextTick(() => {
      resetSize(236, 368);
    });
    return (
      <Teleport to="body">
        <div class={classes} onClick={mask.clickClose ? maskClick : undefined}>
          <div class="w-dialog" style={this.baseStyle}>
            <div class="dialog-close-btn w-cursor" style={this.closeBtnBaseStyle} onClick={closeDialog}/>
            {this.$slots.default!()}
          </div>
        </div>
      </Teleport>
    )
  }
});
