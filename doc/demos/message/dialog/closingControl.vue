<script setup lang="ts">
import { useDialog } from 'shuimo-ui';

const { visible, closeDialog } = useDialog();
</script>

<template>

  <m-dialog v-model:visible="visible" :close-btn="false">
    <template #active>
      <m-button>点击显示弹窗</m-button>
    </template>
    <div><m-button @click="closeDialog">关闭</m-button></div>
  </m-dialog>

</template>

<style scoped>

</style>
