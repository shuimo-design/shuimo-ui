<template>
  <m-button @click="toggleLoading">toggle</m-button>
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
import { MMessage } from "../../lib";
const toggleLoading = () => {
  MMessage.success({
    content: "你好",
    dragAllow: true,
    direction: "top-center",
  });
};
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
