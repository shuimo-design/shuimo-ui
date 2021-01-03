<template>
  <div style="position:relative">
    <span ref="trigger">
      <slot></slot>
    </span>
    <div
        class="w-tooltip"
        v-bind:class="{'visible': show === true}"
        ref="popover"
        role="tooltip">
      <div class="w-tooltip-arrow"/>
      <div class="w-tooltip-inner">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import EventListener from "../_utils/EventListener";

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
      width: {
        type: Number,
        default: 200
      }
    },
    data () {
      return {
        position: {
          top: 0,
          left: 0
        },
        show: true,
        showFlag: false // 用于判断延迟关闭
      }
    },
    watch: {
      show: function (val) {
        if (val) {
          const popover = this.$refs.popover;
          const trigger = this.$refs.trigger.children[0];
          switch (this.placement) {
            case 'top':
              this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
              this.position.top = trigger.offsetTop - popover.offsetHeight - 5;
              break;
            case 'left':
              this.position.left = trigger.offsetLeft - popover.offsetWidth - 5;
              this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
              break;
            case 'right':
              this.position.left = trigger.offsetLeft + trigger.offsetWidth + 5;
              this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2;
              break;
            case 'bottom':
              this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2;
              this.position.top = trigger.offsetTop + trigger.offsetHeight + 5;
              break
          }
          popover.style.top = this.position.top + 'px';
          popover.style.left = this.position.left + 'px';
        }
      }
    },
    methods: {
      toggle () {
        this.show = !this.show;
      }
    },
    mounted () {
      if (!this.$refs.popover) {
        return console.error('Could not fid popover ref in your component that uses popoverMixin');
      }
      // 获取监听对象
      const triger = this.$refs.trigger.children[0];
      const popover = this.$refs.popover;
      // 根据trigger监听特定事件
      if (this.trigger === 'hover') {
        this._mouseenterEvent = EventListener.listen(triger, 'mouseenter', () => {
          this.show = true;
          this.showFlag = true;
        });
        this._mouseleaveEvent = EventListener.listen(triger, 'mouseleave', () => {
          this.showFlag = false;
          setTimeout(() => {
            if (!this.showFlag) {
              this.show = false;
            }
          }, 1000)
        });
        this._mouseenterEvent1 = EventListener.listen(popover, 'mouseenter', () => {
          this.show = true;
          this.showFlag = true;
        });
        this._mouseleaveEvent1 = EventListener.listen(popover, 'mouseleave', () => {
          this.showFlag = false;
          setTimeout(() => {
            if (!this.showFlag) {
              this.show = false;
            }
          }, 1000);
        });
      } else if (this.trigger === 'focus') {
        this._focusEvent = EventListener.listen(triger, 'focus', () => {
          this.show = true;
        });
        this._blurEvent = EventListener.listen(triger, 'blur', () => {
          this.show = false;
        });
      } else {
        this._clickEvent = EventListener.listen(triger, 'click', this.toggle);
      }
      this.show = !this.show;
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
    }
  }
</script>
<style lang="scss">
  .w-tooltip {
    padding: 3px 4px;
    position: absolute;
    visibility: hidden;
    color: #192F6F;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border: unset;
    outline: unset;
    border: 3px double transparent;
    border-image: url("../assets/tooltip/bg.png") 10;
    background-color: whitesmoke;

    &.visible {
      visibility: visible;
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
  }
</style>
