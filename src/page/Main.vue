<template>
  <div class="base">
    <h1>这里是playground</h1>


    <m-border>
      <div class="test m-scroll">
        <div class="inside"/>
      </div>
    </m-border>

  </div>
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
.base {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.test {
  height: 400px;
  width: 400px;
  overflow: auto;

}

.inside {
  height: 5000px;
  width: 1200px;
  background: linear-gradient(0deg,  #ffc700 0%, #e91e1e 100%);

}
</style>
