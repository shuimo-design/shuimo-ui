<template>
  <div class="progress">
    <w-progress :width="250" :value="100" :show-info="true"/>
    <br/>
    <w-progress :height="17" :value="loopPer" :max="1000" :show-info="true"/>
    <br/>
    <w-progress :value="50" :style="{'--w-progress-leaf-height':'50px'}" :show-info="true"/>
    <br/>
    <w-progress :width="150" :value="loopPer" :max="1000"/>
    <br/>
    <w-progress :width="150" :height="28" :value="loopPer" :max="1000"/>
    <br/>
    <w-progress :width="250" :value="0" :show-info="true"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description: 进度条demo
 * @Author: 菩萨蛮
 * @Date: 2022/1/21 6:21 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";

const loopPer = ref(0);
setInterval(() => {
  if (loopPer.value < 1000) {
    loopPer.value += 1;
  } else {
    loopPer.value = 0;
  }
}, 16);

</script>

<style lang="scss" scoped>

</style>
