<template>
  <div class="layout-main">
    <Menu/>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
/**
 * @Description: 基础模版
 * @Author: 阿怪
 * @Date: 2022/3/3 12:08 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import Menu from '@/components/base/Menu.vue';

</script>

<style scoped>

.layout-main{
  display: grid;
  height: calc(100vh - 102px);
  grid-template-columns: 315px auto;
  grid-template-rows: 100%;
}

</style>
