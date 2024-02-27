<script setup lang="ts">
/**
 * @description shuimo ui nuxt loading preview
 * @author 阿怪
 * @date 2024/1/29 01:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import MLoadingLogo from './MLoadingLogo.vue';

const [loading] = defineModel({});
const props = defineProps<{
  preInit?: () => Promise<boolean>;
}>();

onMounted(async () => {
  if (props.preInit) {
    await props.preInit();
  }
  loading.value = false;
});

</script>

<template>
  <MLoadingLogo/>
</template>

<style scoped>

</style>
