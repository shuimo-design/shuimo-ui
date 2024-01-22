<template>
  <m-checkbox v-model="value" lable="极客江湖"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(true);
</script>
