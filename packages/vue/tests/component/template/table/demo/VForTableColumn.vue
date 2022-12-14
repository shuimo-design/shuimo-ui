<template>
  <MTable :data="data">
    <MTableColumn v-for="item in columns" :param="item.param" :label="item.label"/>
  </MTable>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/10/20 01:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import MTable from '../../../../../lib/template/table/MTable';
import MTableColumn from '../../../../../lib/template/table/MTableColumn';

const columns = ref([
  { param: 'id', label: 'id' },
  { param: 'param', label: 'param' }
]);
const data = ref([
  { id: 1, param: '立春' },
  { id: 2, param: '雨水' }
]);
</script>
