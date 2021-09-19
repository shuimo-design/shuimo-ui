<template>
  <div class="entry">
    <Header :show-button="false"/>
    <div class="entry-main">
      <Component/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Component from '../components/entry/Component.vue'
import Header from '../components/Header.vue'
</script>

<style scoped lang="scss">

.entry{
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.entry-main {
  height: calc(100vh - 100px);
  display: grid;
  grid-template-areas:  "container";
}

.component {
  grid-area: container;
}
</style>
