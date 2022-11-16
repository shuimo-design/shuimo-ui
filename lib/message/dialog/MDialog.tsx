/**
 * @description 弹窗组件
 * @author: 阿怪
 * @date 2020/11/23 3:08 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * 太多魔法值了不太好维护，抽空优化下
 *
 * v1.0.1 阿怪 调整代码结构为setup形式，抽离关闭按钮
 */

import { computed, defineComponent, nextTick, Teleport } from 'vue';
import useDialog from '../../dependents/_composables/useDialog';
import { CLOSE_EVENT, CONFIRM_EVENT } from '../../dependents/_utils/constants';
import { props } from './api';
import MDialogCloseBtn from './MDialogCloseBtn';

export default defineComponent({
  name: 'MDialog',
  props,
  emits: [CLOSE_EVENT, CONFIRM_EVENT],
  setup(props, { slots, emit }) {
    const { pes, maskClass, resetSize, maskClick, closeDialog } = useDialog(props, { emit });

    const baseStyle = computed(() => {
      const baseH = 236, baseW = 368, basePaddingTop = 70, basePaddingSide = 35;
      return {
        'padding-top': `${basePaddingTop * pes.value}px`,
        'padding-left': `${basePaddingSide * pes.value}px`,
        'padding-right': `${basePaddingSide * pes.value}px`,
        height: `${baseH * pes.value}px`,
        width: `${baseW * pes.value}px`
      };
    });

    const closeBtnBaseStyle = computed(() => {
      const top = 41,
        left = 427;
      return {
        top: `${top * pes.value}px`,
        left: `${left * pes.value - 23}px`
      };
    });

    return () => {
      const classes = maskClass.value;
      const { visible, mask } = props;
      if (!visible) {
        return null;
      }
      // eslint-disable-next-line vue/valid-next-tick
      nextTick(() => {
        resetSize(236, 368);
      }).then();

      const closeBtn = props.closeBtn ? (
        <MDialogCloseBtn style={closeBtnBaseStyle.value} onClick={closeDialog} />
      ) : undefined;

      return (
        <Teleport to="body">
          <div class={classes} onClick={mask.clickClose ? maskClick : undefined}>
            <div class="m-dialog" style={baseStyle.value}>
              {closeBtn}
              {slots.default!()}
            </div>
          </div>
        </Teleport>
      );
    };
  }
});
