<template>
  <div class="dialog-component">
    <img class="dialog" src="/src/assets/entry/dialog.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Dialog'
}
</script>

<style scoped lang="scss">
.dialog-component {
  display: grid;
  grid-template-areas:  ". . ."
                        ". main ."
                        ". . .";
  height: 100%;
  grid-auto-columns: realPx(575) auto realPx(351);
  grid-auto-rows: auto realPx(696) realPx(207);
  position: relative;

  .dialog {
    grid-area: main;
    height: realPx(696);
    z-index: 1;
  }
}
</style>
