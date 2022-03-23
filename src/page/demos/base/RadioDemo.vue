<template>
  <div>
    <w-radio v-model="radio1" label="A">选项A</w-radio>
    <w-radio v-model="radio1" label="B">选项B</w-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radio1 = ref('B');

</script>

<style lang="scss" scoped>

</style>
