<template>
  <div class="header-button w-cursor-pointer">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * @description header的按钮组件
 * @author 阿怪
 * @date 2021/9/8 2:18 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


</script>

<style lang="scss" scoped>

.header-button {
  float: right;
  display: inline-block;
  height: 80px;
  width: 84px;
  margin-left: 20px;
  background: url(/src/assets/entry/header_btn.png) no-repeat;

  font-size: 24px;
  line-height: 80px;
  font-family: wljh, serif;
  color: #222222;
  letter-spacing: -4px;
  text-shadow: 1px 2px 0 #ffffff;

  &:hover {
    color: #660000;
  }
}

</style>
