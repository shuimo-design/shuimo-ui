<template>
  <m-popover hover>
    <m-button text="将毛笔移入试试"/>
    <template #content>
      <div class="popover">大侠别来无恙！</div>
    </template>
  </m-popover>
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

.popover {
  height: 150px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
