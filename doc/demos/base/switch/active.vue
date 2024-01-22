<template>
  <m-switch v-model="value" active-info="active" inactive-info="inactive"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(true);
</script>
