<template>
  <div>
    <span ref="trigger">
      <slot name="reference"></slot>
    </span>
    <Teleport to="body">
      <div v-bind:class="{'visible': popoverVisible === true}"
           ref="popover"
           class="popover popover-size w-popover" :style="PopoverStyle">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
  import EventListener from "../_utils/EventListener";

  const DEFAULT_SELECT_BORDER = 5;
  const DEFAULT_MARGIN = 20;

  const getStyle = (selectStyle, type) => {
    const num = Number(selectStyle[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  };

  export default {
    name: "WPopover",
    props: {
      trigger: {
        type: String,
        default: 'hover'
      }
    },
    data() {
      return {
        popoverVisible: true,
        popoverVisibleFlag: false,
        Trigger: null,
        triggerStyle: {
          offsetTop: null,
          offsetLeft: null,
          height: null,
          width: null
        }
      }
    },
    computed: {
      PopoverStyle() {
        const t = this.triggerStyle;
        return {
          left: `${t.offsetLeft - DEFAULT_SELECT_BORDER}px`,
          top: `${t.offsetTop + t.height + DEFAULT_MARGIN}px`,
        }
      }
    },
    watch: {
      popoverVisible() {
        this.setStyle();
      }
    },
    mounted() {
      this.Trigger = this.$refs['trigger'];
      this.setStyle();
      if (!this.$refs.popover) {
        return console.error('Could not fid popover ref in your component that uses popoverMixin');
      }
      // 获取监听对象
      const triger = this.$refs.trigger;
      const popover = this.$refs.popover;
      // 根据trigger监听特定事件
      if (this.trigger === 'hover') {
        this._mouseenterEvent = EventListener.listen(triger, 'mouseenter', () => {
          this.popoverVisible = true;
          this.popoverVisibleFlag = true;
        });
        this._mouseleaveEvent = EventListener.listen(triger, 'mouseleave', () => {
          this.popoverVisibleFlag = false;
          setTimeout(() => {
            if (!this.popoverVisibleFlag) {
              this.popoverVisible = false;
            }
          }, 1000)
        });
        this._mouseenterEvent1 = EventListener.listen(popover, 'mouseenter', () => {
          this.popoverVisible = true;
          this.popoverVisibleFlag = true;
        });
        this._mouseleaveEvent1 = EventListener.listen(popover, 'mouseleave', () => {
          this.popoverVisibleFlag = false;
          setTimeout(() => {
            if (!this.popoverVisibleFlag) {
              this.popoverVisible = false;
            }
          }, 1000);
        });
      } else if (this.trigger === 'focus') {
        this._focusEvent = EventListener.listen(triger, 'focus', () => {
          this.popoverVisible = true;
        });
        this._blurEvent = EventListener.listen(triger, 'blur', () => {
          this.popoverVisible = false;
        });
      } else {
        this._clickEvent = EventListener.listen(triger, 'click', this.toggle);
      }
      this.popoverVisible = !this.popoverVisible;
    },
    // 在组件销毁前移除监听，释放内存
    beforeUnmount () {
      if (this._blurEvent) {
        this._blurEvent.remove();
        this._focusEvent.remove();
      }
      if (this._mouseenterEvent) {
        this._mouseenterEvent.remove();
        this._mouseleaveEvent.remove();
        this._mouseenterEvent1.remove();
        this._mouseenterEvent2.remove();
      }
      if (this._clickEvent) {
        this._clickEvent.remove();
      }
    },
    methods: {
      /**
       * 设置popover样式
       */
      setStyle() {
        const { Trigger } = this;
        const triggerStyle = window.getComputedStyle(Trigger);
        this.triggerStyle.offsetLeft = Trigger.offsetLeft;
        this.triggerStyle.offsetTop = Trigger.offsetTop;
        this.triggerStyle.height = getStyle(triggerStyle, 'height');
        this.triggerStyle.width = getStyle(triggerStyle, 'width');
      },
      toggle () {
        this.popoverVisible = !this.popoverVisible;
      }
    }
  }
</script>

<style scoped lang="scss">
  .popover {
    position: absolute;
    background: url("/lib/assets/popover/popover_bg.png") no-repeat;
    background-size: 100% 100%;
    visibility: hidden;
    margin: 3px 4px;
    padding: 2px 0 5px;
    min-width: 150px;
    max-width: 234px;
    min-height: 150px;

    &.visible {
      visibility: visible;
    }

    .content {
      margin: 0 28px;
    }
  }
</style>
