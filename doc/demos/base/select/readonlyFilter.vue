<template>
  <m-select v-model="value" :options="options" :readonly="false"
            :filter="customFilter"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type ValueType = any;
const value = ref<ValueType>('甲');
const options: ValueType[] = ['甲', '甲乙丙', '子鼠寅卯', '甲乙丙丁'];
const customFilter = (option: ValueType, inputValue: string) => {
  return option.toLowerCase().includes(inputValue.toLowerCase());
};
</script>
