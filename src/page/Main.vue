<template>

    <m-loading :side-length="100"/>


  <div class="loading-div" v-loading>
    <span>hello</span>
  </div>


  <m-button @click="toggleLoading">toggle</m-button>

  <div class="loading-div" v-loading="loadingRef">
    <span>hi</span>
  </div>


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

const loadingRef = ref(true);
const toggleLoading = () => {
  loadingRef.value = !loadingRef.value;
}
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
