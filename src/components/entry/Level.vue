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
  position: absolute;
  left: 543px;
  bottom: 104px;
  height: 546px;
  width: 980px;

  .level,
  .left,
  .right,
  .center {
    position: absolute;
  }

  .level {
    height: 546px;
    z-index: 10;
  }

  .center {
    height: 500px;
    z-index: 8;
    left: 80px;
    top: -20px;
  }

  .left,
  .right {
    z-index: 9;
  }

  .right {
    height: 245px;
    bottom: 40px;
    right: -150px;
  }

  .left {
    height: 247px;
    bottom: 40px;
    left: -30px;
  }
}

</style>