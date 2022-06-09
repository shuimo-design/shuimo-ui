<template>
  <div>
    <m-button text="点击弹出确认框" @click="showConfirm"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2021/9/24 1:11 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { getCurrentInstance } from 'vue';

const ctx = getCurrentInstance();
const confirm = ctx.appContext.config.globalProperties.$confirm;


const showConfirm = async () => {
  const res = await confirm('测试确认，文字长一点看看效果');
  console.log(res);
}

</script>

<style lang="scss" scoped>

</style>
