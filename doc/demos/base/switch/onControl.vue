<template>
  <span>参数值为：{{ value }}</span>
  <m-switch v-model="value" on-control  @change="onChange"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
const onChange = (info: string | boolean) => {
  console.log(info);
};
</script>
