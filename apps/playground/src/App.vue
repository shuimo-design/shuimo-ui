<template>
  <m-rice-paper class="main-paper" :mountain="false">
    <div class="base">
      <h1>这里是{{MODE}}的playground</h1>
      <Playground/>
    </div>
  </m-rice-paper>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:17
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Playground from './Playground.vue';

const { MODE } = import.meta.env;


</script>

<style scoped>
.main-paper {
  height: 100vh;
  width: 100vw;
  font-size: 14px;
}

.base {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
