<template>
  <w-tabs v-model="current">
    <w-tab-pane v-for="tab in tabList" :label="tab.label" :name="tab.name" :key="tab.name">
      {{tab.label}}
    </w-tab-pane>
  </w-tabs>
</template>

<script setup>
import {ref} from 'vue'
const current = ref('0')

const tabList = ref([
  {
    label: '标签1',
    name: '0'
  },
  {
    label: '标签2',
    name: '1'
  }
])
</script>

<style scoped>

</style>