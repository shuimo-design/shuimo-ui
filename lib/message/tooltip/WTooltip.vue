<template>
  <div>
    <div ref="reference" class="w-tooltip-reference">
      <slot></slot>
    </div>
    <Teleport to="body">
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
    </Teleport>
  </div>
</template>
<script>
import useDomEvent from '../../dependents/_utils/useDomEvent';
import { getStyleNumber } from "../../dependents/_utils/dom";

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
    const { onController, offController, popoverVisible, referenceStyle } = useDomEvent()
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
</style>
