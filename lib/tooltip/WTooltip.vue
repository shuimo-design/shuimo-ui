<template>
  <div style="position:relative">
    <div ref="reference" class="w-tooltip-reference">
      <slot></slot>
    </div>
    <div
        class="w-tooltip"
        :class="{ 'visible': popoverVisible }"
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
import domEventHandler from '../_utils/domEventHandler';
import { getStyleNumber } from "../_utils/dom";

const DEFAULT_MARGIN_BOTTOM = 18;
const DEFAULT_MARGIN_TOP = 5;

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
      const { offsetLeft, offsetTop, width, height } = this.referenceStyle;
      let popoverHeight = 0;
      if (this.$refs.popover) {
        popoverHeight = getStyleNumber(this.$refs.popover, 'height');
      }
      return {
        left: `${offsetLeft + width / 2}px`,
        top: (offsetTop - height - DEFAULT_MARGIN_BOTTOM) > 0
            ? `${offsetTop - popoverHeight - DEFAULT_MARGIN_BOTTOM}px`
            : `${offsetTop + height + DEFAULT_MARGIN_TOP}px`,
        fixed: offsetTop - height - DEFAULT_MARGIN_BOTTOM < 0
      }
    }
  },
  setup() {
    const { onController, offController, popoverVisible, referenceStyle } = domEventHandler()
    return {
      onController,
      offController,
      popoverVisible,
      referenceStyle
    }
  },
  mounted() {
    const configs = this.getElements();
    this.onController(configs);
  },
  beforeUnmount() {
    const configs = this.getElements();
    this.offController(configs)
  },
  methods: {
    getElements() {
      const reference = this.$refs.reference.children[0]
          ? this.$refs.reference.children[0]
          : this.$refs.reference;
      if (reference.tagName === 'SPAN') {
        reference.style.display = 'inline-block';
      }
      const popper = this.$refs.popover;
      return {
        reference,
        popper,
        trigger: this.trigger,
        openDelay: this.openDelay,
        closeDelay: this.closeDelay
      }
    }
  }
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
