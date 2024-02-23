<template>
  <div class="home menu-right m-scroll" ref="contentRef">
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
/**
 * @Description: 首页
 * @Author: 阿怪
 * @Date: 2022/3/4 2:07 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { useResetScroll } from '@/compositions/entry/useResetScroll';

const contentRef = ref<HTMLDivElement | null>(null);
useResetScroll(contentRef);
</script>

<style scoped>

</style>
