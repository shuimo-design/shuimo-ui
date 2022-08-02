<template>

  <m-button>默认</m-button>
  <m-button type="primary">主要的</m-button>
  <m-button type="error">错误</m-button>
  <m-button type="confirm">确认/保存</m-button>
  <m-button type="warning">警告</m-button>
  <m-button disabled>禁用</m-button>

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


</script>

<style lang="scss" scoped>

.m-button {
  margin: 15px;
}

:deep(.m-button-primary) {
  --m-button-height: 80px;
  --m-button-width: 180px;
}

</style>
