<template>
  <div>单选(options为[]){{ value4 }}</div>
  <MSelect v-model="value3" :options="options4" :readonly="false" @focus="onFocus"/>
  <MSelect multiple v-model="value4" :options="options4" :readonly="false" @focus="onFocus"/>
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
import { reactive, ref } from 'vue';
import MSelect from '../../lib/base/select/MSelect';

const value3 = ref('1111');
const value4 = ref(['1111']);
const options4 = reactive(['1111','1111', '2222', '3313', '4441']);


const onFocus = ()=>{
  console.log('hi');
}
</script>

<style lang="scss" scoped>
.loading-div {
  height: 200px;
  width: 200px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
