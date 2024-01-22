<template>
  <m-switch v-model="value" @change="onChange" inactive-info="bye"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
const onChange = (info: string | boolean) => {
  console.log(info);
};
</script>
