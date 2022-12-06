<template>
  <div>多选(options为object[]):{{ value1 }}</div>
  <MSelect v-model="value1" :options="options1" :input-readonly="false" input-param="after" option-param="before" value-param="number" multiple>
    <template #option>
      <div>这是一个插槽</div>
    </template>
  </MSelect>
  <div>多选(options为[]):{{ value2 }}</div>
  <MSelect v-model="value2" :options="options2" multiple>
    <template #option>
      <div>插槽</div>
    </template>
  </MSelect>
  ________________________________________________________________________
  <div>单选(options为object[]):{{ value3 }}</div>
  <MSelect v-model="value3" input-param="after" option-param="before" value-param="number" :options="options3">
    <template #option>
      <div>插槽</div>
    </template>
  </MSelect>
  <div>单选(options为[]){{ value4 }}</div>
  <MSelect v-model="value4" :input-readonly="false" :options="options4" >
  </MSelect>
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
import { reactive, ref } from "vue";
import MSelect from "../../lib/base/select/MSelect";
const value1 = ref('1');
const options1 = reactive([
  { before: "乾", after: "12", number: "1111" },
  { before: "兑", after: "1212333333333333", number: "2222" },
  { before: "离", after: "115444444444444444444422", number: "3333" },
  { before: "震", after: "33555555555555555555533", number: "4444" },
]);

const value2 = ref(['1111']);
const options2 = reactive(["1111", "2222", "3333", "4444"]);
// 单选
const value3 = ref('1');
const options3 = reactive([
  { before: "乾", after: "坎", number: "1" },
  { before: "兑", after: "坤", number: "2" },
  { before: "离", after: "震", number: "3" },
  { before: "震", after: "巽", number: "4" },
]);
const value4 = ref(undefined);
const options4 = reactive(["1", "2", "3", "4"]);
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
