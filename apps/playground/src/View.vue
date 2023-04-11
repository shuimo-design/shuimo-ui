<template>
  <div>
    here is Playground
    <div class="render"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/4 00:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, onMounted, ref, watch } from 'vue';
import useWindowEvent from './iframe/useWindowEvent';
import useRender from './compositions/render/useRender';
import { initWebComponent } from '@shuimo-design/web-component/index';

// window.addEventListener('message', (event) => {
//   console.log(`Received message from parent: ${event.data}`);
//   // do something with the message
// });

initWebComponent();
const { init, register } = useWindowEvent();

const templateHTML = register('html');
const templateCss = register('css');
const templateScript = register('script');
const templateType = register('type');

const code = computed(() => ({
  templateHTML: templateHTML.value,
  templateCss: templateCss.value,
  templateScript: templateScript.value
}));

const playRender = ref(useRender(templateType));
const isMounted = ref(false);


watch([templateHTML, templateCss, templateScript], () => {
  if (isMounted.value) {
    playRender.value.update(code.value);
  }
});
watch(() => templateType.value, () => {
  playRender.value.updateRender(code.value);
});

onMounted(() => {
  isMounted.value = true;
});




if (import.meta.hot) {
  import.meta.hot.on('update-core', () => {
    console.log('update-core');
    playRender.value.updateRender(code.value);
  });
}

</script>

<style lang="scss" scoped>

</style>
