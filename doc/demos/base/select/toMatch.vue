<template>
  <div>值为：{{ value }}</div>
  <m-select v-model="value"
            input-param="before"
            option-param="before"
            :to-match="toMatch"
            :options="options"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const options = [
  { before: '乾', after: '坎', element: '金' },
  { before: '兑', after: '坤', element: '金' },
  { before: '离', after: '震', element: '木' },
  { before: '震', after: '巽', element: '木' }
]
const value = ref(undefined);
type OptionType = { before: string, after: string, element: string };
const toMatch = (option: OptionType, value: OptionType) => {
  return option.element === value.element;
}

</script>
