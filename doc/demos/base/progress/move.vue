<template>
  <m-progress :height="18" :value="loopPer" :max="1000" :show-info="true">
    <span>{{ Math.ceil(loopPer / 10) }}%</span>
  </m-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const loopPer = ref(0);

onMounted(() => {
  setInterval(() => {
    if (loopPer.value < 1000) {
      loopPer.value += 1;
    } else {
      loopPer.value = 0;
    }
  }, 16);
})
</script>
