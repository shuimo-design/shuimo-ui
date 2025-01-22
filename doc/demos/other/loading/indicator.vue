<template>
  <m-loading>
    <template #indicator>
      <div class="indicator"/>
    </template>
  </m-loading>
</template>

<style scoped>
.indicator {
  height: 20px;
  width: 20px;
  border: 3px solid #ffffff00;
  border-top: 3px solid var(--m-color-main);
  border-radius: 50%;

  animation-name: m-rotate;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-duration: var(--m-loading-speed);
}
</style>
