<template>
  <div class="other flex">

    <m-loading/>
    <m-loading mask/>
    <m-loading mask :side-length="300"/>

    <div class="divider">
      <m-divider/>
      <m-divider/>
      <div style="height: 200px">
        <m-divider vertical/>
      </div>
    </div>

    <m-dark-mode v-model="darkModeRef" :init-handler="initHandler" @change="onChangeMode"/>
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

</script>

<style scoped>

.divider{
  width: 20rem;
}

</style>
