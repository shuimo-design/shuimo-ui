<template>
  <div class="entry">
    <Level/>
    <Dialog/>
  </div>
</template>

<script lang="ts" setup>
import Level from '../components/entry/Level.vue'
import Dialog from '../components/entry/Dialog.vue'
</script>

<style scoped lang="scss">
.entry {
  height: 100vh;
  display: grid;
  grid-template-areas:  "container";
}

.level-component,
.dialog-component {
  grid-area: container;
}
</style>
