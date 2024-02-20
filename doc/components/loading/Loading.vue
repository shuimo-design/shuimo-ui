<template>
  <div class="loading">
    <LogoSvg/>
    <span>正在加载...</span>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/8/30 10:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import LogoSvg from './LogoSvg.vue';

defineProps<{ modelValue: boolean }>();
const emits = defineEmits(['update:modelValue']);


onMounted(async () => {
  // await import('shuimo-ui/dist/style.css');
  emits('update:modelValue', false);
});

</script>

<style scoped>

.loading {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('/img/base/loading/rice_paper.png') repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
