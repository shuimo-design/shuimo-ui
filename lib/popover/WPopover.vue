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
import domEventHandler from "../dependents/_utils/domEventHandler";

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
    const {onController, offController, popoverVisible, referenceStyle} = domEventHandler()
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
.w-popover {
  display: inline-block;
}

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
