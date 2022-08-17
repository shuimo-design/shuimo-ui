<template>

  <m-switch v-model="s">
    <template #activeInfo>
      <span>开</span>
    </template>
    <template #inactiveInfo>
      <span>关</span>
    </template>
  </m-switch>

  <m-switch v-model="s2" loading/>
  <m-switch v-model="s3" disabled/>

  <span>{{ s4 }}</span>
  <m-switch v-model="s4" @change="changeInfo" on-control activeValue="hi" inactiveValue="bye" :loading="s4Loading"/>

  <m-switch v-model="s5" @change="print"/>
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

const s = ref(true);
const s2 = ref(false);
const s3 = ref(false);
const s4 = ref('bye');
const s4Loading = ref(false)
const s5 = ref(false);

const changeInfo = (value: string) => {
  s4Loading.value = true;
  setTimeout(() => {
    s4Loading.value = false;
    s4.value = value;
  }, 1000);
}

const print = (value:any)=>{
  console.log(value);
}


</script>

<style lang="scss" scoped>

</style>
