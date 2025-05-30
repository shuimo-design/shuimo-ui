<script setup lang="ts">
const val = ref(50);
const changeVal = ref(50);

const onChange = (value: number) => {
  changeVal.value = value;
};
</script>

<template>
  <div>
    <div>current value: {{ val }}</div>
    <div>change value: {{ changeVal }}</div>
  </div>
  <m-slider v-model="val" :min="0" :max="100" @change="onChange"/>
</template>
