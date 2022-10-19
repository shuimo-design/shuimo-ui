<template>
  <MTable :data="dataDemo">
    <MTableColumn v-for="item in columns" :param="item.param" :label="item.label"/>
    <MTableColumn param="id" label="id"/>
    <MTableColumn param="param" label="param"/>
  </MTable>
</template>

<script lang="ts" setup>

/**
 * @description playground
 * @author 阿怪
 * @date 2021/6/8 11:42 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";

const columns = ref([
  { param: 'id', label: 'id' },
  { param: 'param', label: 'param' }
])


const dataDemo = ref([
  { id: 1, param: '立春' },
  { id: 2, param: '雨水' },
  { id: 3, param: '惊蛰' },
  { id: 4, param: '春分' },
  { id: 5, param: '清明' },
  { id: 6, param: '谷雨' },
  { id: 7, param: '立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至、小寒、大寒' },
]);

</script>

<style lang="scss" scoped>
.loading-div {
  height: 200px;
  width: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
