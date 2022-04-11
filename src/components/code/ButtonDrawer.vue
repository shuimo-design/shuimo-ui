<template>
  <w-button text="点击查看demo源码" @click="show"/>
  <w-drawer :visible="visible" @close="hide" :drawerClass="['code-drawer']">
    <slot></slot>
    <w-button text="关闭" @click="hide"/>
  </w-drawer>
</template>

<script setup lang="ts">
/**
 * @description 给PrismCode用的抽屉组件
 * @author 阿怪
 * @date 2021/9/11 2:08 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

const visible = ref(false);
const show = () => visible.value = true;
const hide = () => visible.value = false;


</script>

<style lang="scss" scoped>

</style>
