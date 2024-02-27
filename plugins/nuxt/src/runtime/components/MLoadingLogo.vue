<script setup lang="ts">
/**
 * @description shuimo loading logo component
 * @author 阿怪
 * @date 2024/1/29 10:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

const loadingStrRef = ref('加载中');

const timerRef = ref();
const loadingFunc = () => {
  if (loadingStrRef.value.length < 6) {
    loadingStrRef.value += '.';
  } else {
    loadingStrRef.value = '加载中';
  }
};

onMounted(() => {
  timerRef.value = setInterval(loadingFunc, 500);
});

onUnmounted(() => {
  clearInterval(timerRef.value);
});
</script>

<template>
  <div class="screen">
    <div class="m-loading-main"></div>
    <div class="m-loading-content">
      <div class="m-loading-content-text">{{ loadingStrRef }}</div>
    </div>
  </div>
</template>

<style scoped>

.screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  --m-loading-size-w: 25.6vw;
  --m-loading-size-h: 20vw;
}

.m-loading-content-text {
  text-align: center;
  margin-top: 2vw;
}

.m-loading-main {
  grid-area: main;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 32/25;
  height: var(--m-loading-size-h);
  width: var(--m-loading-size-w);
  background-image: url(shuimo-ui/public/icon/logo.svg);
  background-size: contain;
  background-repeat: no-repeat;
  animation-name: heart-beat;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-duration: var(--m-loading-speed);
}

@keyframes heart-beat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.95);
  }
  40% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

</style>
