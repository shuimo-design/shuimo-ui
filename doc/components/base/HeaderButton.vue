<template>
  <NuxtLink class="header-button m-cursor-pointer" :to="url" :target="target">
    <slot></slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
/**
 * @Description: header的按钮组件
 * @Author: 阿怪
 * @Date: 2021/9/8 2:18 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

defineProps<{ url: string, target?: string }>();

</script>

<style scoped>

.header-button {
  float: right;
  display: inline-block;
  height: 80px;
  width: 84px;
  margin-left: 20px;
  background: url(/img/entry/header_btn.png) no-repeat;

  font-size: 24px;
  line-height: 80px;
  font-family: var(--wljh);
  color: var(--color);
  letter-spacing: -4px;
  text-shadow: var(--text-shadow);

  &:hover {
    color: var(--hover-color);
  }
}
</style>
