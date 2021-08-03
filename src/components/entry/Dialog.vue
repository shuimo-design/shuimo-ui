<template>
  <img class="dialog-component" src="/src/assets/entry/dialog.png" alt="">
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dialog'
})
</script>

<style scoped lang="scss">
.dialog-component {
  height: 696px;
  position: absolute;
  bottom: 190px;
  left: 575px;
}
</style>