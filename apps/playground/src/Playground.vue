<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

const onFocusEvent = (value: any) => {
  console.log(value);
};

const value = ref('');

</script>

<template>

  <span>{{ value }}</span>
  <m-input :value="value" placeholder="请输入..." @focus="onFocusEvent"/>
  <input type="text" :value="value">
  <m-border>
    <div class="test"></div>
  </m-border>

</template>

<style scoped>

m-button {
  margin: 4px;
}

.test{
  width: 100px;
  height: 100px;
  background-color: red;
}

</style>
