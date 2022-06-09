<template>
  <div>
    <BaseTitle>日期</BaseTitle>
    <span>选择的日期为{{ date }}</span>
    <br/>
    <m-date-picker v-model="date"/>
    <BaseTitle>月份</BaseTitle>
    <span>选择的月份为{{ month }}</span>
    <br/>
    <m-date-picker v-model="month" type="month"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description date picker demo
 * @author youus
 * @date 2020/11/27 10:32 下午
 * @version v1.1.0
 *
 * Hello, humor
 *
 * v1.1.0 升级为setup版本 阿怪
 */
import { ref } from 'vue';
import BaseTitle from '../../../components/base/BaseTitle.vue';

const date = ref('');
const month = ref('');
</script>

<style lang="scss" scoped>

</style>
