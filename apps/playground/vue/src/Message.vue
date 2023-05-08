<template>
  <div class="flex">
    <m-popover hover>
      <m-button text="将毛笔移入试试"/>
      <template #content>
        <div>君不见，黄河之水天上来</div>
      </template>
    </m-popover>

    <m-dialog>
      <template #active>
        <m-button>点击这里</m-button>
      </template>
      <div>
        <h1>这里是dialog</h1>
      </div>
    </m-dialog>

    <m-drawer>
      <template #active>
        <m-button>点击这里</m-button>
      </template>
      <div>
        <h1>这里是drawer</h1>
      </div>
    </m-drawer>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 22:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


</script>

<style lang="scss" scoped>

</style>
