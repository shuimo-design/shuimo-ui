<template>
  <div class="component" id="level">
    <div class="entry-dialog">
      <w-input/>
      <w-button text="确定"/>
    </div>
    <img class="level" src="/src/assets/entry/level.png" alt="">
    <img class="fan-left" src="/src/assets/entry/fan-left.png" alt="">
    <img class="fan-center" src="/src/assets/entry/fan-center.png" alt="">
    <img class="fan-right" src="/src/assets/entry/fan-right.png" alt="">
  </div>
</template>

<script setup lang="ts">
import { initEventHandler } from "../../plugins/mouseMovePlugin";

initEventHandler('level', 25);

</script>

<style scoped lang="scss">
@import "/src/style/base.scss";

.component {
  display: grid;
  grid-template-areas:  ". . ."
                        ". main ."
                        ". . .";
  height: 100%;
  grid-auto-columns: realPx(400) auto realPx(227);
  grid-auto-rows: auto realPx(734) realPx(104);
  position: relative;
  transform: translate(0px, 0px);
  transition: transform 500ms;

  .main-area {
    grid-area: main;
    position: relative;
  }

  .entry-dialog {
    @extend .main-area;
    background: url(/lib/assets/dialog/bg.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    width: realPx(996);
    height: realPx(690);
    padding-top: realPx(130);
    padding-left: realPx(40);
    z-index: -1;
  }

  .level {
    @extend .main-area;
    height: realPx(564);
    margin-top: realPx(200);
    z-index: 4;
  }

  .fan-left {
    @extend .main-area;
    height: realPx(246);
    width: realPx(461);
    margin-top: realPx(480);
    margin-left: realPx(-40);
    z-index: 3;
  }

  .fan-center {
    @extend .main-area;
    height: realPx(524);
    width: realPx(1038);
    margin-top: realPx(180);
    margin-left: realPx(50);
    z-index: 2;
  }

  .fan-right {
    @extend .main-area;
    height: realPx(245);
    width: realPx(444);
    margin-top: realPx(470);
    margin-left: realPx(700);
    z-index: 3;
  }
}
</style>
