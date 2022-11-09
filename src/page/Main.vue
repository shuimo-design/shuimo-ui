<template>
  <MSelect v-model="value" input-param="after" option-param="before" value-param="number" :options="options" multiple/>
  <MSelect v-model="value2" input-param="after" option-param="before" value-param="number" :options="options2"/>
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
const value = ref([]);
// const options = reactive(["子", "丑", "寅", "卯"]);
const options = reactive([
  { before: "乾", after: "坎", number: "壹" },
  { before: "兑", after: "坤", number: "贰" },
  { before: "离", after: "震", number: "叁" },
  { before: "震", after: "巽", number: "肆" },
]);
const value2 = ref([]);
// const options = reactive(["子", "丑", "寅", "卯"]);
const options2 = reactive([
  { before: "乾", after: "坎", number: "壹" },
  { before: "兑", after: "坤", number: "贰" },
  { before: "离", after: "震", number: "叁" },
  { before: "震", after: "巽", number: "肆" },
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
