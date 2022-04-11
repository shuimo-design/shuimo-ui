<template>
  <div>
    <BaseTitle>普通输入框</BaseTitle>
    <span>参数值：{{ data }}</span>
    <br/>
    <w-input v-model="data"/>
    <BaseTitle>空文本输入框</BaseTitle>
    <span>参数值：{{ emptyData }}</span>
    <br/>
    <w-input v-model="emptyData" placeholder="请输入文字"/>
    <BaseTitle>多文本输入框</BaseTitle>
    <w-input v-model="data" type="textarea"/>
    <BaseTitle>密码框</BaseTitle>
    <w-input v-model="data" type="password"/>
    <BaseTitle>数字输入框</BaseTitle>
    <span>输入的数字为：{{ number }}</span>
    <br/>
    <w-input-number v-model="number" :max="100"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description input demo
 * @author 阿怪
 * @date 2020/11/27 10:32 下午
 * @version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.1.0 优化为setup版本及优化整体结构 阿怪
 */
import { ref } from 'vue';
import BaseTitle from '../../../components/base/BaseTitle.vue';

const data = ref('这是一些初始数据');
const emptyData = ref('');
const number = ref(0);
</script>

<style lang="scss" scoped>

</style>
