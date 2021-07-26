<template>
  <div class="mask-div">
    <div class="mask-main">
      <slot></slot>
    </div>
    <div class="mask-line mask-top-line"/>
    <div class="mask-line mask-left-line"/>
    <div class="mask-line mask-right-line"/>
    <div class="mask-line mask-bottom-line"/>
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
  display: grid;
  grid-template-columns: 6px auto 6px;
  grid-template-rows: 5px auto 5px;
  grid-template-areas: "topleft top topright"
                       "left main right"
                       "bottomleft bottom bottomright";
  height: 100%;
  width: 100%;
}

.mask-line, .mask-main {
  display: inline-block;
}

.mask-line{
  position: relative;
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
}

.mask-top-line {
  grid-area: topleft / topleft / topright / topright;
  top: -2.5px;
}

.mask-right-line {
  grid-area: topright / topright / bottomright / bottomright;
  right: -3px;
}

.mask-bottom-line {
  grid-area: bottomleft / bottomleft / bottomright / bottomright;
  bottom: -2.5px;
}

.mask-left-line {
  grid-area: topleft / topleft / bottomleft / bottomleft;
  left: -3px;
}


.mask-main {
  box-sizing: border-box;
  grid-area: topleft / topleft / bottomright / bottomright;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: auto;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
}

</style>
