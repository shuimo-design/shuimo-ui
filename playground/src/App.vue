<script setup lang="ts">
/**
 * @description vue app
 * @author 阿怪
 * @date 2023/4/19 22:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Playground from './Playground.vue';

import { MPrinter } from "shuimo-ui/index";

const mPrinter = MPrinter();

mPrinter.info({
    message: 'error',
    description: 'error description'
});
</script>

<template>
  <m-rice-paper class="rice-paper">
    <Playground/>
  </m-rice-paper>
</template>

<style scoped>

.rice-paper {
  height: 100vh;
  width: 100vw;
}

</style>
