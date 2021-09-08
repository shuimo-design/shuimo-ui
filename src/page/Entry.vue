<template>
  <Header :show-button="false"/>
  <div class="entry">
    <Component/>
  </div>
</template>

<script lang="ts" setup>
import Component from '../components/entry/Component.vue'
import Header from '../components/Header.vue'
</script>

<style scoped lang="scss">
.entry {
  height: calc(100vh - 100px);
  display: grid;
  grid-template-areas:  "container";
}

.component {
  grid-area: container;
}
</style>
