<template>
  <m-button @click="rePrint">点击再次打印</m-button>
</template>

<script setup lang="ts">
import { MPrinter } from "shuimo-ui";
import { onMounted } from "vue";

const printer = MPrinter('极客江湖');

const rePrint = ()=>{
  printer.suggest('建议');
  printer.info('信息');
  printer.error('异常');
}

onMounted(()=>{
  rePrint();
})

</script>

<style scoped>

</style>
