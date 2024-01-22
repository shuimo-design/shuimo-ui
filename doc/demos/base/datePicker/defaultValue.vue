<template>
  <div>日期：{{ date }}</div>
  <m-date-picker v-model="date"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref(new Date());

</script>
