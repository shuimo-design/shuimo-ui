<script setup lang="ts">
const breadcrumbOptions = ref([
  { content: '首页' },
  { content: '列表' },
  { content: '详情' },
]);
</script>

<template>
  <m-breadcrumb :options="breadcrumbOptions"/>
</template>

<style scoped>

</style>
