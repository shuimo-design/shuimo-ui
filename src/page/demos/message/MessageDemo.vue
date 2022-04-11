<template>
  <div>
    <w-button text="点击出现Message" @click="callMessage"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description Message弹窗Demo
 * @author 阿怪
 * @date 2021/1/9 4:54 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { getCurrentInstance } from 'vue'

let flag = 0;
const ctx = getCurrentInstance();
const message = ctx.appContext.config.globalProperties.$message;
const callMessage = () => {
  message.success('success的message');
  message.warning('warning的message');
  message.info('info的message');
  message({ content: 'normal' })
}

</script>

