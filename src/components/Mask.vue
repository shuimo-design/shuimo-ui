<template>
  <div class="mask-div">
    <div class="mask-line mask-top-line"/>
    <div class="mask-line mask-left-line"/>
    <div class="mask-line mask-right-line"/>
    <div class="mask-line mask-bottom-line"/>
    <div class="mask-main">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/7/20 4:37 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Mask'
});
</script>

<style lang="scss" scoped>

.mask-div {
  height: 100%;
  width: 100%;
}

.mask-line, .mask-main {
  display: inline-block;
  position: relative;
  z-index: 10;
}

.mask-top-line, .mask-bottom-line {
  background: url(/src/assets/line/crossrange.png) repeat-x;
  width: 100%;
  height: 5px;
}

.mask-left-line, .mask-right-line {
  background: url(/src/assets/line/vertical.png) repeat-y;
  height: 100%;
  width: 6px;
  top: -6px;
}

.mask-left-line {
  left: -2px;
}

.mask-bottom-line {
  bottom: 23px;
}

.mask-right-line {
  right: calc(-100% + 10px);
}

.mask-main {
  z-index: 1;
  top: calc(-100% - 30px);
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  overflow: auto;
}

</style>
