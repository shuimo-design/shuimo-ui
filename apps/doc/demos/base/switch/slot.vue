<template>
  <m-switch v-model="value" active-info="active" inactive-info="inactive">
    <template #activeInfo>
      <span>这里是activeInfo slot</span>
    </template>
  </m-switch>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(true);
</script>
