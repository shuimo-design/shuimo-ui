/**
 * @description 弹窗组件
 * @author: 菩萨蛮
 * @date 2020/11/23 3:08 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

import {defineComponent} from 'vue';

export default defineComponent({
  name: 'WDialog',
  props: {
    mask: {type: Object, default: {show: true, clickClose: false}},
    visible: {type: Boolean, default: false}
  },
  methods: {
    getClasses() {
      return {
        maskClass: ['mask', this.mask.show ? 'mask-bg' : '']
      }
    },
    maskClick(e) {
      // click mask
      if (e.path[0].classList.contains('mask')) {
        this.closeDialog();
      }
    },
    closeDialog() {
      this.$emit('close');
    }
  },
  render() {
    const classes = this.getClasses();
    const {visible, mask} = this;
    const {maskClick, closeDialog} = this;
    if (!visible) {
      return null;
    }


    return (
      <div>
        <div class={classes.maskClass} onClick={mask.clickClose ? maskClick : null}>
          <div class="w-dialog">
            <div class="dialog-close-btn" onClick={closeDialog}/>
            {this.$slots.default()}
          </div>
        </div>
      </div>
    )
  }
});
