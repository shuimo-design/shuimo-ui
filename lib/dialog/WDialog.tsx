/**
 * @description 弹窗组件
 * @author: 菩萨蛮
 * @date 2020/11/23 3:08 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */

import {h, defineComponent, Teleport} from 'vue';

export default defineComponent({
  name: 'WDialog',
  props: {
    mask: {type: Object, default: {show: true, clickClose: false}},
    visible: {type: Boolean, default: false}
  },
  data() {
    return {
      pes: 1
    }
  },
  computed: {
    baseStyle() {
      const baseH = 236, baseW = 368, basePaddingTop = 70, basePaddingSide = 35;
      const {pes} = this;
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
      const {pes} = this;
      return {
        'top': `${top * pes}px`,
        'left': `${left * pes - 23}px`,
      }
    }
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
    },
    resetSize() {
      const slotDom = this.$slots.default();
      if (slotDom) {
        const dom = slotDom[0].el;
        const baseH = 236, baseW = 368;
        if (dom) {
          const h = Number(getComputedStyle(dom, null).height.replace('px', ''));
          const w = Number(getComputedStyle(dom, null).width.replace('px', ''));
          // 为了修复不知道为什么第二次打开getComputedStyle没值的问题
          if (h !== 0 || w !== 0) {
            this.pes = Math.max(h / baseH, w / baseW, 1);
          }
        }
      }
    }
  },
  render() {
    const classes = this.getClasses();
    const {visible, mask} = this;
    const {maskClick, closeDialog} = this;
    if (!visible) {
      return null;
    }

    const {resetSize} = this;
    this.$nextTick(() => {
      resetSize();
    });
    return (
      <Teleport to="body">
        <div class={classes.maskClass} onClick={mask.clickClose ? maskClick : null}>
          <div class="w-dialog" style={this.baseStyle}>
            <div class="dialog-close-btn" style={this.closeBtnBaseStyle} onClick={closeDialog}/>
            {this.$slots.default()}
          </div>
        </div>
      </Teleport>
    )
  }
});
