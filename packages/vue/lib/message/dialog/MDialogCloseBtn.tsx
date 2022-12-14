/**
 * @description
 * @author 阿怪
 * @date 2022/7/15 02:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MDialogCloseBtn',
  emits: ['click'],
  setup(props, { emit }) {
    return () => <div class="m-dialog-close-btn m-cursor-pointer" onClick={e => emit('click', e)} />;
  }
});
