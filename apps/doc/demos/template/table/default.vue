<template>
  <m-table :data="data" height="350px">
    <m-table-column width="80px" param="id" label="序号"/>
    <m-table-column param="param" label="参数"/>
    <m-table-column param="option" label="操作">
      <template #default="{data}">
        <m-button text="操作" @click="print(data)"/>
      </template>
    </m-table-column>
  </m-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MPrinter } from "shuimo-ui";

const data = ref([
  { id: 1, param: '立春' },
  { id: 2, param: '雨水' },
  { id: 3, param: '惊蛰' },
  { id: 4, param: '春分' },
  { id: 5, param: '清明' },
  { id: 6, param: '谷雨' },
  { id: 7, param: '立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至、小寒、大寒' },
]);

const print = (data) => {
  MPrinter('水墨列表组件').info(data);
}

</script>
