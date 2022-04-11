<template>
  <div class="progress">
    <BaseTitle>建议实践</BaseTitle>
    <w-progress :width="399" :value="0" :max="100" :show-info="true"/>
    <w-progress :width="399" :value="100" :max="100" :show-info="true"/>
    <br/>
    <w-progress :width="399" :value="100" :max="100" :show-info="true"/>
    <br/>
    <BaseTitle>滚动效果</BaseTitle>
    <w-progress :height="18" :value="loopPer" :max="1000" :show-info="true"/>
    <br/>
    <BaseTitle>修改尺寸</BaseTitle>
    <w-progress :value="50" :leafHeight="50" :show-info="true"/>
    <br/>
    <w-progress :width="300" :value="loopPer" :max="1000"/>
    <br/>
    <BaseTitle>隐藏百分比信息</BaseTitle>
    <w-progress :width="300" :height="40" :value="loopPer" :max="1000"/>
    <br/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description 进度条demo
 * @author 阿怪
 * @date 2022/1/21 6:21 PM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";
import BaseTitle from '../../../components/base/BaseTitle.vue';

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
