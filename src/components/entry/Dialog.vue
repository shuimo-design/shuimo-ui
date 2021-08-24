<template>
  <div class="dialog-component" id="dialog">
    <img class="dialog" src="/src/assets/entry/dialog.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  mounted() {
    window.addEventListener('mousemove', (e) => {
      let x = 0.5-e.clientX/document.body.offsetWidth;
      let y = 0.5-e.clientY/document.body.offsetHeight;
      document.getElementById('dialog').style.transform = `translate(${x*10}px, ${y*10}px)`;
    })
  }
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
  transform: translate(0px, 0px);
  transition: transform 500ms;

  .dialog {
    grid-area: main;
    height: realPx(696);
    z-index: -1;
  }
}
</style>
