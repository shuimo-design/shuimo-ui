<template>
  <div>
    <BaseTitle>form-block</BaseTitle>
    <m-form>
      <m-form-item label="input输入：" prop="hello">
        <m-input value="hello, form"/>
      </m-form-item>
      <m-form-item label="日期选择：" prop="hello">
        <m-date-picker v-model="month" type="month"/>
      </m-form-item>
      <m-form-item label="textarea输入：" prop="hello">
        <m-input value="hello, form" type="textarea"/>
      </m-form-item>
      <m-form-item label="按钮">
        <m-button @click="clickBtn">点击按钮</m-button>
      </m-form-item>
      <m-form-item label="按钮">
        <template #label>
          <m-button>标题插槽</m-button>
        </template>
        <m-button @click="clickBtn">点击按钮</m-button>
      </m-form-item>
    </m-form>
    <BaseTitle>form-inline</BaseTitle>
    <m-form inline>
      <m-form-item label="input输入：" prop="hello">
        <m-input value="hello, form"/>
      </m-form-item>
      <m-form-item label="日期选择：" prop="hello">
        <m-date-picker v-model="month" type="month"/>
      </m-form-item>
      <m-form-item label="选项：" prop="hello">
        <m-select v-model="selectVal" :options="options" :keyParam="'title'" @select="select"/>
      </m-form-item>
    </m-form>
    <BaseTitle>form submit开启模式</BaseTitle>
    <m-form submit>
      <m-form-item label="按钮">
        <m-button @click="clickBtn">点击触发action</m-button>
      </m-form-item>
    </m-form>
  </div>
</template>

<script setup lang="ts">
/**
 * @description 表单组件demo
 * @author youus
 * @date 2021/1/11 11:51 AM
 * @version v1.1.0
 *
 * Hello, humor
 * V1.1.0 @author 阿怪 重构为setup版本，并添加submit开启demo
 */
import { reactive, ref } from 'vue';
import BaseTitle from '../../../components/base/BaseTitle.vue';
import { MPrinter } from '../../../../lib';

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
  MPrinter('水墨表单组件').info('点击按钮');
}
</script>

<style scoped>

</style>
