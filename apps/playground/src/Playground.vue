<template>
  <m-button>按钮</m-button>
  <m-button>按钮2</m-button>
  <button class="line">按钮</button>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


</script>

<style scoped>

.line{
  filter: url(#m-line-filter);

  padding: 0 15px;
  height: 32px;
  outline: unset;
  line-height: 24px;
  min-width: 70px;
  border-radius: 2px;
  /*color: white;*/
  text-align: center;
  border: 2px solid black;
}

</style>
