<template>
  <m-button :disabled="disabled" type="error">按钮</m-button>
  <m-button>按钮2</m-button>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

const disabled = ref(true);

</script>

<style scoped>

m-button {
  margin: 4px;
}

</style>
