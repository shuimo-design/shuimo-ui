<template>
  <div>
    <span ref="reference">
      <slot name="reference"></slot>
    </span>
    <Teleport to="body">
      <transition name="w-linear">
        <div v-show="popoverVisible"
             ref="popover"
             :style="popoverStyle"
             class="popover popover-size w-popover">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
  import {addClass, removeClass} from "../_utils/dom";
  import {off, on} from "../_utils/dom";

  const DEFAULT_MARGIN_LEFT = 10;
  const getStyle = (selectStyle, type) => {
    const num = Number(selectStyle[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  };

  export default {
    name: "WPopover",
    props: {
      trigger: {
        type: String,
        default: 'click'
      },
      openDelay: {
        type: Number,
        default: 0
      },
      closeDelay: {
        type: Number,
        default: 200
      },
      visible: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      popoverStyle() {
        const r = this.referenceStyle;
        return {
          left: `${DEFAULT_MARGIN_LEFT - r.offsetLeft / 2 }px`,
          top: `${r.offsetTop + r.height}px`
        }
      }
    },
    watch: {
      popoverVisible(newVal, old) {
        if (!old) {
          this.$emit('update:visible', true);
        }
      },
      visible() {
        this.popoverVisible = this.visible;
      }
    },
    data() {
      return {
        popoverVisible: false,
        reference: null,
        _timer: null,
        referenceStyle: {
          offsetTop: null,
          offsetLeft: null,
          height: null,
          width: null
        }
      }
    },
    mounted() {
      let reference = this.reference = this.$refs.reference.children[0]
        ? this.$refs.reference.children[0]
        : this.$refs.reference;
      const popper = this.$refs.popover;
      // 可访问性
      if (reference) {
        if (this.trigger !== 'click') {
          on(reference, 'focusin', this.handleFocus);
          on(popper, 'focusin', this.handleFocus);
          on(reference, 'focusout', this.handleBlur);
          on(popper, 'focusout', this.handleBlur);
        }
        on(reference, 'keydown', this.handleKeydown);
        on(reference, 'click', this.handleClick);
      }
      if (this.trigger === 'click') {
        on(reference, 'click', this.doToggle);
        on(document, 'click', this.handleDocumentClick);
      } else if (this.trigger === 'hover') {
        on(reference, 'mouseenter', this.handleMouseEnter);
        on(popper, 'mouseenter', this.handleMouseEnter);
        on(reference, 'mouseleave', this.handleMouseLeave);
        on(popper, 'mouseleave', this.handleMouseLeave);
      } else if (this.trigger === 'focus') {
        if (reference.querySelector('input, textarea')) {
          on(reference, 'focusin', this.doShow);
          on(reference, 'focusout', this.doClose);
        } else {
          on(reference, 'mousedown', this.doShow);
          on(reference, 'mouseup', this.doClose);
        }
      }
    },
    // 在组件销毁前移除监听，释放内存
    beforeUnmount () {
      this.cleanup();
      const reference = this.reference;

      off(reference, 'click', this.doToggle);
      off(reference, 'mouseup', this.doClose);
      off(reference, 'mousedown', this.doShow);
      off(reference, 'focusin', this.doShow);
      off(reference, 'focusout', this.doClose);
      off(reference, 'mousedown', this.doShow);
      off(reference, 'mouseup', this.doClose);
      off(reference, 'mouseleave', this.handleMouseLeave);
      off(reference, 'mouseenter', this.handleMouseEnter);
      off(document, 'click', this.handleDocumentClick);
    },
    methods: {
      doToggle() {
        this.popoverVisible = !this.popoverVisible;
        this.setStyle();
      },
      doShow() {
        this.popoverVisible = true;
        this.setStyle();
      },
      doClose() {
        this.popoverVisible = false;
      },
      handleFocus() {
        const popper = this.$refs.popover;
        addClass(popper, 'focusing');
        if (this.trigger === 'click' || this.trigger === 'focus') {
          this.popoverVisible = true;
          this.setStyle();
        }
      },
      handleBlur() {
        const popper = this.$refs.popover;
        removeClass(popper, 'focusing');
        if (this.trigger === 'click' || this.trigger === 'focus') this.popoverVisible = false;
      },
      handleKeydown(ev) {
        if (ev.keyCode === 27 && this.trigger !== 'manual') { // esc
          this.doClose();
        }
      },
      handleClick() {
        const reference = this.reference;
        removeClass(reference, 'focusing');
      },
      handleDocumentClick(e) {
        let reference = this.reference || this.$refs.reference.children[0];
        const popper = this.$refs.popover;
        if (!reference ||
          reference.contains(e.target) ||
          !popper ||
          popper.contains(e.target)) return;
        this.doClose();
      },
      handleMouseEnter() {
        clearTimeout(this._timer);
        if (this.openDelay) {
          this._timer = setTimeout(() => {
            this.popoverVisible = true;
            this.setStyle();
          }, this.openDelay);
        } else {
          this.popoverVisible = true;
          this.setStyle();
        }
      },
      handleMouseLeave() {
        clearTimeout(this._timer);
        if (this.closeDelay) {
          this._timer = setTimeout(() => {
            this.popoverVisible = false;
          }, this.closeDelay);
        } else {
          this.popoverVisible = false;
        }
      },
      cleanup() {
        if (this.openDelay || this.closeDelay) {
          clearTimeout(this._timer);
        }
      },
      /**
       * 设置下拉框样式
       */
      setStyle() {
        const { reference } = this;
        const referenceStyle = window.getComputedStyle(reference);
        // todo 需要优化offset的获取
        this.referenceStyle.offsetLeft = reference.getBoundingClientRect().left + window.pageXOffset;
        this.referenceStyle.offsetTop = reference.getBoundingClientRect().top + window.pageYOffset;
        this.referenceStyle.height = getStyle(referenceStyle, 'height');
        this.referenceStyle.width = getStyle(referenceStyle, 'width');
      }
    }
  }
</script>

<style scoped lang="scss">
  .popover {
    position: absolute;
    background: url("/lib/assets/popover/popover_bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 3px 4px;
    padding: 2px 0 5px;
    min-width: 150px;
    max-width: 234px;
    min-height: 150px;
    z-index: 9999;

    &.focusing {
      display: block;
    }

    .content {
      margin: 0 28px;
    }
  }
</style>
