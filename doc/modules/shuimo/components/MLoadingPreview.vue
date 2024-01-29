<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/29 01:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MLoadingLogo from '~/modules/shuimo/components/MLoadingLogo.vue';

const [loading] = defineModel({});

onMounted(async () => {
  await import('shuimo-ui/dist/style.css');

  // todo add to plugin setting
  await import('assets/style/markdown.css');
  await import('assets/style/shikiji.css');


  loading.value = false;
});

</script>

<template>
  <MLoadingLogo/>
</template>

<style scoped>

</style>
