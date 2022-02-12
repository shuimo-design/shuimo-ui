<template>
  <div>
    <BaseTitle>form-block</BaseTitle>
    <w-form>
      <w-form-item label="input输入：" prop="hello">
        <w-input value="hello, form"/>
      </w-form-item>
      <w-form-item label="日期选择：" prop="hello">
        <w-date-picker v-model="month" type="month"/>
      </w-form-item>
      <w-form-item label="textarea输入：" prop="hello">
        <w-input value="hello, form" type="textarea"/>
      </w-form-item>
      <w-form-item label="按钮">
        <w-button @click="clickBtn">点击按钮</w-button>
      </w-form-item>
    </w-form>
    <BaseTitle>form-inline</BaseTitle>
    <w-form inline>
      <w-form-item label="input输入：" prop="hello">
        <w-input value="hello, form"/>
      </w-form-item>
      <w-form-item label="日期选择：" prop="hello">
        <w-date-picker v-model="month" type="month"/>
      </w-form-item>
      <w-form-item label="选项：" prop="hello">
        <w-select v-model="selectVal" :options="options" :keyParam="'title'" @select="select"/>
      </w-form-item>
    </w-form>
    <BaseTitle>form submit开启模式</BaseTitle>
    <w-form submit>
      <w-form-item label="按钮">
        <w-button @click="clickBtn">点击触发action</w-button>
      </w-form-item>
    </w-form>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description: 表单组件demo
 * @Author: youus
 * @Date: 2021/1/11 11:51 AM
 * @Version v1.1.0
 *
 * Hello, humor
 * V1.1.0 @author 阿怪 重构为setup版本，并添加submit开启demo
 */
import { reactive, ref } from 'vue';
import BaseTitle from '../../../components/base/BaseTitle.vue';
import { WPrinter } from '../../../../lib';

const month = ref('');
const selectVal = ref('psm');
const selected = reactive({ title: '未选择' });
const options = reactive([
  { title: 'psm', value: 1 },
  { title: 'ngz', value: 2 },
  { title: 'kh3', value: 3 },
  { title: 'ljx', value: 4 },
]);

const select = (option: { title: string, value: number }) => {
  Object.assign(selected, options);
}

const clickBtn = () => {
  WPrinter('水墨表单组件').info('点击按钮');
}
</script>

<style scoped>

</style>
