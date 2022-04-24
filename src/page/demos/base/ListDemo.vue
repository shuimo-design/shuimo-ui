<template>
  <div>
    <w-list :data="data">
      <template #default="item">
        <span>{{ item.title }}</span>
        <div :style="{height:item.value+'px'}">div height: {{ item.value }}</div>
      </template>
    </w-list>
    <w-list :data="data"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/4/24 22:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";

const data = ref([
  { title: '轩辕剑', value: 40, active: true },
  { title: '湛卢', value: 60 },
  { title: '赤霄', value: 30 }
])

</script>

<style lang="scss" scoped>

</style>
