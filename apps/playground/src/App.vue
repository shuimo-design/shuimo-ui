<template>
  <m-rice-paper class="main-paper" cold="false" :mountain="mountain">
    <div class="base">
      <m-button @click="togglePaper" type="primary">设置paper</m-button>
      <h1>这里是playground</h1>
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
import { ref } from 'vue';

const mountain = ref(false);
const togglePaper = () => {
  mountain.value = !mountain.value;
};

</script>

<style scoped>
.main-paper {
  height: 100vh;
  width: 100vw;
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
