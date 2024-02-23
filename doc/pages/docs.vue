<template>
  <div class="docs menu-right m-scroll" ref="contentRef">
    <NuxtPage/>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description:
 * @Author: 阿怪
 * @Date: 2022/3/4 9:40 PM
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
