<template>
  <div class="code-div">
    <div>
      <w-button text="hi" @click="printHi"/>
      <w-button text="长长长长长长长长长长长长长长" :disabled="true" @click="printHi"/>
      <w-button text="type测试" @click="printHi" type="gray"/>
      <w-button text="弹窗按钮" @click="printHi" type="dialog"/>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2020/11/27 10:31 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

const printHi = () => {
  console.log('hi');
}
</script>
