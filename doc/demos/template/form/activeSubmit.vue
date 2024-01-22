<template>
  <m-form submit>
    <m-form-item label="按钮">
      <m-button @click="clickBtn">点击触发action</m-button>
    </m-form-item>
  </m-form>
</template>

<script setup lang="ts">
import { MPrinter } from "shuimo-ui";

const clickBtn = () => {
  // 这条不会触发
  MPrinter('水墨表单组件').info('点击按钮');
}

</script>
