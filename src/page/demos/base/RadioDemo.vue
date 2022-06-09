<template>
  <div>
    <m-radio v-model="radio1" label="A">选项A</m-radio>
    <m-radio v-model="radio1" label="B">选项B</m-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radio1 = ref('B');

</script>

<style lang="scss" scoped>

</style>
