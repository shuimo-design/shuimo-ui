<template>
  <m-switch v-model="value" loading/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
</script>
