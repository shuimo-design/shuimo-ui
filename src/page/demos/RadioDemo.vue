<template>
  <div>
    <w-radio v-model="radio" label="1" @change="changeHandle" @before="beforeHandle">备选项</w-radio>
    <w-radio v-model="radio" label="2" @change="changeHandle" @before="beforeHandle">备选项2</w-radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const radio = ref('1');

const changeHandle = (val) => {
  console.log(radio.value);
  console.log(val);
}

const beforeHandle = (val) => {
  console.log(radio.value);
  console.log(val);
}
</script>

<style lang="scss" scoped>

</style>
