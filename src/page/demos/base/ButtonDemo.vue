<template>
  <div class="code-div">
    <div>
      <m-button text="hi" @click="printHi"/>
      <m-button text="长长长长长长长长长长长长长长" :disabled="true" @click="printHi"/>
      <m-button text="type测试" @click="printHi" type="gray"/>
      <m-button text="double按钮" @click="printHi" type="double"/>
      <m-button @click="printHi" type="double">slot形式</m-button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2020/11/27 10:31 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

const printHi = () => {
  console.log('hi');
}
</script>
