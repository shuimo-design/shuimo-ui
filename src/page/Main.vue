<template>
  <span>{{ value }}</span>
  <m-select v-model="value" :options="options">
    <template #option="{option}">
      <span>{{ option.title }} 的值为 {{ option.value }}</span>
    </template>
  </m-select>
  <m-select v-model="value"
            :options="options" option-param="title" inputParam="title"
            :to-match="toMatch"/>
  <m-select v-model="value" v-on:forSearch="filterOptions" @select="selectOption" :inputReadonly="false"
            :options="options" option-param="title" inputParam="title" :valueParam="valueParam"
            :to-match="toMatch"/>
  <m-input v-model="valueParam"/>

</template>

<script lang="ts" setup>
/**
 * @description playground
 * @author 阿怪
 * @date 2021/6/8 11:42 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";
import useDialog from "../../lib/message/dialog/useDialog";

const { visible, closeDialog, showDialog, toggleDialog } = useDialog();

const options = [
  { title: '公共', value: 1 },
  { title: '私有', value: 2 },
];

const value = ref(1);
const valueParam = ref('value');

const toMatch = (option: any, value: any) => {
  // return option.value === value.value;
  return option === value;
}

const filterOptions = (value: InputEvent) => {
  console.log(value);
}

const selectOption = (option: any) => {
  console.log(option);
}

</script>

<style lang="scss" scoped>

</style>
