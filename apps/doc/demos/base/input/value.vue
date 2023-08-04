<template>
  <span>{{ value }}</span>
  <br/>
  <m-input v-model="value"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('大侠可尝试修改这里');
</script>
