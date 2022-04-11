<template>
  <h2><slot></slot></h2>
  <w-divider v-if="divider"/>
</template>

<script lang="ts" setup>
/**
 * @description 基础标题模块
 * @author 阿怪
 * @date 2022/1/22 2:58 AM
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 增加一个divider开关选项
 */

const props = withDefaults(defineProps<{
  divider?: boolean
}>(), {
  divider: true
});
</script>
