<template>
  <m-list :data="data">
    <template #default="{data}">
      <span>{{ data.title }}</span>
    </template>
  </m-list>
</template>

<script setup lang="ts">
const data = [
  { title: '轩辕剑', active: true },
  { title: '湛卢' },
  { title: '赤霄' },
];
</script>
