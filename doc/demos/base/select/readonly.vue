<template>
  <m-select v-model="value" :options="['子', '丑', '寅', '卯']" :readonly="false"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('子');
</script>
