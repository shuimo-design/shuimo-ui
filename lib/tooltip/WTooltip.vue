<template>
  <div style="position:relative">
    <div ref="reference" class="reference">
      <slot></slot>
    </div>
    <div
        class="w-tooltip"
        :class="{ 'visible': tooltipVisible === true }"
        :style="popoverStyle"
        ref="popover"
        role="tooltip">
      <div :class="['w-tooltip-arrow', { 'fixed-arrow': popoverStyle.fixed }]"/>
      <div class="w-tooltip-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { addClass, removeClass } from "../_utils/dom";
import { off, on } from "../_utils/dom";

const DEFAULT_MARGIN_BOTTOM = 8;
const DEFAULT_MARGIN_TOP = 5;
const getStyle = (selectStyle, type) => {
  const num = Number(selectStyle[type].replace('px', ''));
  return isNaN(num) ? 0 : num;
};

export default {
  name: 'WTooltip',
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    // 目前只有top
    placement: {
      type: String,
      default: 'top'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 200
    },
  },
  computed: {
    popoverStyle() {
      const r = this.referenceStyle;
      return {
        left: `${r.offsetLeft + r.width / 2}px`,
        top: (r.offsetTop - r.height - DEFAULT_MARGIN_BOTTOM) > 0
            ? `${r.offsetTop - r.height - DEFAULT_MARGIN_BOTTOM}px`
            : `${r.offsetTop + r.height + DEFAULT_MARGIN_TOP}px`,
        fixed: r.offsetTop - r.height - DEFAULT_MARGIN_BOTTOM < 0
      }
    }
  },
  data() {
    return {
      tooltipVisible: false,
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
      on(reference, 'focusin', this.handleFocus);
      on(popper, 'focusin', this.handleFocus);
      on(reference, 'focusout', this.handleBlur);
      on(popper, 'focusout', this.handleBlur);
    }
    if (this.trigger === 'hover') {
      on(reference, 'mouseenter', this.handleMouseEnter);
      on(popper, 'mouseenter', this.handleMouseEnter);
      on(reference, 'mouseleave', this.handleMouseLeave);
      on(popper, 'mouseleave', this.handleMouseLeave);
    } else if (this.trigger === 'focus') {
      on(reference, 'mousedown', this.doShow);
      on(reference, 'mouseup', this.doClose);
    }
  },
  methods: {
    handleFocus() {
      const popper = this.$refs.popover;
      addClass(popper, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') {
        this.tooltipVisible = true;
        this.setStyle();
      }
    },
    handleBlur() {
      const popper = this.$refs.popover;
      removeClass(popper, 'focusing');
      if (this.trigger === 'click' || this.trigger === 'focus') this.tooltipVisible = false;
    },
    doClose() {
      this.tooltipVisible = false;
    },
    handleMouseEnter() {
      clearTimeout(this._timer);
      if (this.openDelay) {
        this._timer = setTimeout(() => {
          this.tooltipVisible = true;
          this.setStyle();
        }, this.openDelay);
      } else {
        this.tooltipVisible = true;
        this.setStyle();
      }
    },
    handleMouseLeave() {
      clearTimeout(this._timer);
      if (this.closeDelay) {
        this._timer = setTimeout(() => {
          this.tooltipVisible = false;
        }, this.closeDelay);
      } else {
        this.tooltipVisible = false;
      }
    },
    doShow() {
      this.tooltipVisible = true;
      this.setStyle();
    },
    cleanup() {
      if (this.openDelay || this.closeDelay) {
        clearTimeout(this._timer);
      }
    },
    setStyle() {
      const { reference } = this;
      const referenceStyle = window.getComputedStyle(reference);
      this.referenceStyle.offsetLeft = reference.getBoundingClientRect().left + window.pageXOffset;
      this.referenceStyle.offsetTop = reference.getBoundingClientRect().top + window.pageYOffset;
      this.referenceStyle.height = getStyle(referenceStyle, 'height');
      this.referenceStyle.width = getStyle(referenceStyle, 'width');
    }
  },
  beforeUnmount() {
    this.cleanup();
    const reference = this.reference;

    off(reference, 'focusin', this.doShow);
    off(reference, 'focusout', this.doClose);
    off(reference, 'mousedown', this.doShow);
    off(reference, 'mouseup', this.doClose);
    off(reference, 'mouseleave', this.handleMouseLeave);
    off(reference, 'mouseenter', this.handleMouseEnter);
  },
}
</script>
<style lang="scss">
@keyframes fade-in {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.reference {
  display: inline-block;
  width: auto;
}

.w-tooltip {
  padding: 3px 4px;
  position: fixed;
  visibility: hidden;
  color: #192F6F;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border: unset;
  outline: unset;
  border: 3px double transparent;
  border-image: url("/lib/assets/tooltip/bg.png") 10;
  background-color: whitesmoke;
  transform: translateX(-50%);

  &.visible {
    visibility: visible;
    animation: fade-in .5s ease;
  }

  &.focusing {
    visibility: visible;
    animation: fade-in .5s ease;
  }

  &-inner {
    text-decoration: none;
    word-wrap: break-word;
    min-width: 30px;
    min-height: 10px;
  }

  &-arrow {
    position: absolute;
    display: block;
    overflow: hidden;
    background: transparent;
    pointer-events: none;
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #d0d0d0;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 5px;
      height: 5px;
      margin: auto;
      content: '';
      pointer-events: auto;
    }
  }

  .fixed-arrow {
    bottom: unset;
    top: -13px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #d0d0d0;
    border-top: 5px solid transparent;
  }
}
</style>
