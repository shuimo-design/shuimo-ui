<template>
  <div class="other flex">
    <ComponentsWrap name="Loading">
      <m-loading :speed="0"/>
      <m-loading mask/>
      <m-loading mask :side-length="300"/>
      <m-loading>
        一点信息
      </m-loading>
      <m-loading>
        <template #indicator>
          <img class="indicator" src="../assets/taiji-day.png" alt="">
        </template>
      </m-loading>
      <m-switch v-model="loadingRef"/>
      <div class="loading-div" v-loading="loadingRef">

      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Divider">
      <div class="divider">
        <m-divider/>
        <m-divider/>
        <div style="height: 200px">
          <m-divider vertical/>
        </div>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="DarkMode">
      <m-dark-mode
        v-model="darkModeRef"
        :init-handler="initHandler"
        @change="onChangeMode"
      />
      <m-dark-mode
        v-model="darkModeRef"
        :is-rotate="false"
        :init-handler="initHandler"
        @change="onChangeMode"
      />
    </ComponentsWrap>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 09:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import ComponentsWrap from '../components/ComponentsWrap.vue';

const darkModeRef = ref(false);
const initHandler = () => {
  const darkMode = localStorage.getItem('shuimo-blog-dark-mode');
  darkModeRef.value = darkMode === 'true';

  console.log(darkModeRef.value);
  return false;
};

const onChangeMode = (val: string) => {
  console.log('change mode', val);
  localStorage.setItem('shuimo-blog-dark-mode', val);
};

const loadingRef = ref(true);
</script>

<style scoped>
.divider {
  width: 20rem;
}

.indicator{
  max-width: 100%;
  max-height: 100%;

  animation-name: m-rotate;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-duration: var(--m-loading-speed);
}

.loading-div{
  width: 200px;
  height: 200px;
  background: #CE8892;
}
</style>
