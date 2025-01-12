<script setup lang="ts">
import { useDialog } from "shuimo-ui/index";

const { visible, showDialog } = useDialog();
</script>

<template>
  <m-button @click="showDialog">点击这里</m-button>
  <m-dialog v-model:visible="visible">
    <div>
      <h1>这里是dialog</h1>
    </div>
  </m-dialog>
</template>

<style scoped>

</style>