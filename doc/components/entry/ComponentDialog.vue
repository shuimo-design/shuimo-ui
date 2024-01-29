<template>
  <div class="component" id="level">
    <div class="entry-dialog">
      <m-input/>
      <m-button text="点我进入组件页面" @click="toMain"/>
    </div>
    <img class="level" src="/img/entry/level.webp" alt="">
    <img class="fan-left" src="/img/entry/fan_left.webp" alt="">
    <img class="fan-center" src="/img/entry/fan_center.webp" alt="">
    <img class="fan-right" src="/img/entry/fan_right.webp" alt="">
  </div>
</template>

<script setup lang="ts">
import useMouseMove from '@/compositions/entry/useMouseMove';

useMouseMove('level', 25);

const router = useRouter();
const toMain = () => {
  router.push('/main');
};

</script>

<style scoped>
.component {
  display: grid;
  grid-template-areas: ". . ." ". main ." ". . .";
  height: 100%;
  grid-auto-columns: calc(400 / 1920 * 100vw) auto calc(227 / 1920 * 100vw);
  grid-auto-rows: auto calc(734 / 1920 * 100vw) calc(144 / 1920 * 100vw);
  position: relative;
  transform: translate(0px, 0px);
  transition: transform 500ms;
  grid-area: container;
}

.component .main-area, .component .fan-right, .component .fan-center, .component .fan-left, .component .level, .component .entry-dialog {
  grid-area: main;
  position: relative;
}

.component .entry-dialog {
  background: url(/img/entry/dialog_bg.webp) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  width: calc(996 / 1920 * 100vw);
  height: calc(690 / 1920 * 100vw);
  padding-top: calc(130 / 1920 * 100vw);
  padding-left: calc(40 / 1920 * 100vw);
  z-index: -1;
}

.component .level {
  height: calc(564 / 1920 * 100vw);
  margin-top: calc(200 / 1920 * 100vw);
  z-index: 4;
}

.component .fan-left {
  height: calc(246 / 1920 * 100vw);
  width: calc(461 / 1920 * 100vw);
  margin-top: calc(480 / 1920 * 100vw);
  margin-left: calc(-40 / 1920 * 100vw);
  z-index: 3;
}

.component .fan-center {
  height: calc(524 / 1920 * 100vw);
  width: calc(1038 / 1920 * 100vw);
  margin-top: calc(180 / 1920 * 100vw);
  margin-left: calc(50 / 1920 * 100vw);
  z-index: 2;
}

.component .fan-right {
  height: calc(245 / 1920 * 100vw);
  width: calc(444 / 1920 * 100vw);
  margin-top: calc(470 / 1920 * 100vw);
  margin-left: calc(700 / 1920 * 100vw);
  z-index: 3;
}
</style>
