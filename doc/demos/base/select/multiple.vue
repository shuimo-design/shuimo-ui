<template>
  <m-select v-model="value" :options="options" multiple/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const options = ['子', '丑', '寅', '卯'];
const value = ref(['子', '丑']);
</script>
