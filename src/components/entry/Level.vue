<template>
  <div class="level-component">
    <img class="level" src="/src/assets/entry/level.png" alt="">
    <img class="left" src="/src/assets/entry/left.png" alt="">
    <img class="center" src="/src/assets/entry/center.png" alt="">
    <img class="right" src="/src/assets/entry/right.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Level'
}
</script>

<style scoped lang="scss">
.level-component {
  display: grid;
  grid-template-areas:  ". . ."
                        ". main ."
                        ". . .";
  height: 100%;
  grid-auto-columns: realPx(518) auto realPx(227);
  grid-auto-rows: auto realPx(584) realPx(147);
  position: relative;

  .level {
    height: realPx(564);
    grid-area: main;
    position: absolute;
    bottom: realPx(-50);
    z-index: 4;
    left: realPx(30);
  }
  .center {
    height: realPx(524);
    grid-area: main;
    position: absolute;
    bottom: 10px;
    z-index: 2;
    right: realPx(50);
  }
  .left {
    height: realPx(246);
    grid-area: main;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  .right {
    height: realPx(245);
    grid-area: main;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
  }
}
</style>
