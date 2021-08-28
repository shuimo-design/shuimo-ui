<template>
  <div>
    <h2>选择的title: {{ selected.title }}</h2>
    <w-divider/>
    <span>参数defaultValue:{{ defaultValue }}</span>
    <br/>
    <span>修改参数 defaultValue: <w-input v-model="defaultValue"/></span>
    <br/>
    <w-select v-model="defaultValue" :options="options" @select="select" :can-change="false"/>
    <w-select v-model="defaultValue" :options="options" @select="select" :disabled="true"/>
    <w-divider/>
    <span>参数defaultValue2:{{ defaultValue2 }}</span>
    <w-select v-model="defaultValue2" :options="options" :keyParam="'title'" @select="select"/>
    <w-divider/>
    <span>参数defaultValue3:{{ defaultValue3 }}</span>
    <w-select v-model="defaultValue3" :options="options2" :keyParam="'title'" @select="select"/>
    <w-divider/>
    <span>参数defaultValue4:{{ defaultValue4 }}</span>
    <w-select v-model="defaultValue4" :options="searchData"
              :can-change="true" keyParam="title"
              @select="select"
              v-on:updateOptions="filterOptions"/>
    <w-divider/>
    <span>参数defaultValue5:{{ defaultValue5 }}</span>
    <w-select v-model="defaultValue5" :options="searchData"
              :can-change="true"
              @select="select"
              v-on:updateOptions="filterOptions2">
      <template #default="{data}">
        <span><b>title: </b>{{ data.title }} <b>value:</b> {{ data.value }}</span>
      </template>
    </w-select>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/1/3 4:20 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref, reactive } from 'vue';

type SelectedType = { title: string, value?: string | number };

const defaultValue = ref('1');
const defaultValue2 = ref('psm');
const defaultValue3 = ref('ljx');
const defaultValue4 = ref('psm');
const defaultValue5 = ref(1);
const selected: SelectedType = reactive({ title: '未选择' });
const options = [
  { title: 'psm', value: '1' },
  { title: 'ngz', value: '2' },
  { title: 'kh3', value: '3' },
  { title: 'ljx', value: '4' },
  { title: 'psm2', value: '5' },
  { title: 'psm3', value: '6' },
];
const options2 = [
  { title: 'psm', value: 1 },
  { title: 'ngz', value: 2 },
  { title: 'kh3', value: 3 },
  { title: 'ljx', value: 4 },
  { title: 'sy', value: 5 },
  { title: 'ljx', value: 4 },
  { title: 'ljx', value: 4 },
  { title: 'ljx', value: 4 },
  { title: 'ljx', value: 4 },
];

const select = (option: SelectedType) => {
  Object.assign(selected, option);
};

const searchData: Array<SelectedType> = reactive([
  { title: 'psm', value: 1 },
  { title: 'ngz', value: 2 },
  { title: 'kh3', value: 3 },
  { title: 'ljx', value: 4 },
  { title: 'psm2', value: 5 },
  { title: 'psm3', value: 6 },
])

const filterOptions = async () => {
  const newData = options.filter(e => e.title.includes(defaultValue4.value));
  searchData.length = 0;
  searchData.push(...newData);
}

const filterOptions2 = async () => {
  const newData = options.filter(e => e.value === String(defaultValue5.value));
  searchData.length = 0;
  searchData.push(...newData);
}

</script>

<style lang="scss" scoped>

.w-select {
  display: block;
}

</style>
