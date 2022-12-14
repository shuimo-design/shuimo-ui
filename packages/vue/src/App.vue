<template>
  <m-rice-paper class="main-paper">
    <div class="base">
      <h1>这里是playground</h1>
      <Main/>
    </div>
  </m-rice-paper>
</template>

<script setup>
import Main from './page/Playground.vue';
</script>

<style lang="scss">
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
