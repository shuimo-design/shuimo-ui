<template>
  <div class="entry">
    <Component/>
  </div>
</template>

<script lang="ts" setup>
import Component from '../components/entry/Component.vue'
</script>

<style scoped lang="scss">
.entry {
  height: 100vh;
  display: grid;
  grid-template-areas:  "container";
}

.component {
  grid-area: container;
}
</style>
