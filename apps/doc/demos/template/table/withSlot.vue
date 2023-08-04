<template>
  <m-table :data="data">
    <m-table-column param="param" label="参数">
      <template #default="{data,index}">
        <span>这里是{{ data.param }}的插槽,id为{{ data.id }},index为{{ index }}</span>
      </template>
    </m-table-column>
  </m-table>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref([
  { id: 1, param: '立春' },
  { id: 2, param: '雨水' },
]);
</script>
