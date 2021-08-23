<template>
  <div>
    <w-table :data="dataDemo">
      <w-table-column width="80px" param="id" label="序号"/>
      <w-table-column param="param" label="参数"/>
      <w-table-column param="option" label="操作">
        <template #default="{data}">
          <w-button text="操作" @click="print(data)"/>
        </template>
      </w-table-column>
    </w-table>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description: 表格组件demo页
 * @Author: 菩萨蛮
 * @Date: 2021/8/23 11:42 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

const dataDemo = [
  { id: 1, param: 'hi' },
  { id: 2, param: 'hello' },
  { id: 3, param: 'hello1' },
  { id: 4, param: 'hello2' },
  { id: 5, param: 'hello3' },
  {
    id: 6,
    param: 'hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4hello4'
  },
  { id: 7, param: 'hello5' },
  { id: 8, param: 'hello6' },
  { id: 9, param: 'hello7' },
]

const print = (data) => {
  console.log(data);
}

</script>

<style lang="scss" scoped>

</style>
