<template>
  <div>值为：{{ value }}</div>
  <m-select v-model="value"
            input-param="after"
            option-param="before"
            value-param="number"
            :options="options"/>
</template>

<script setup lang="ts">
import { ref } from "vue";


const options = [
  { before: '乾', after: '坎', number: '壹' },
  { before: '兑', after: '坤', number: '贰' },
  { before: '离', after: '震', number: '叁' },
  { before: '震', after: '巽', number: '肆' }
]

const value = ref('叁');

</script>
