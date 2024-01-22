<template>
  <span>参数值为：{{ value }}</span>
  <m-switch v-model="value"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
</script>
