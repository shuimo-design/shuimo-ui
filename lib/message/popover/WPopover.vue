<template>
  <div class="w-popover">
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
import useDomEvent from "../../dependents/_utils/useDomEvent";

const DEFAULT_MARGIN_LEFT = 5;
const DEFAULT_WIDTH = 234;

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
        left: `${r.offsetLeft + r.width / 2 - DEFAULT_WIDTH / 2 - DEFAULT_MARGIN_LEFT}px`,
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
  setup() {
    const {onController, offController, popoverVisible, referenceStyle} = useDomEvent()
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

<style scoped lang="scss">
</style>
