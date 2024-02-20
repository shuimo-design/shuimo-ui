<template>
  <m-button @click="callMessage">点击显示Message</m-button>
</template>

<script setup lang="ts">
import { MMessage } from 'shuimo-ui';

const callMessage = () => {
  MMessage({
    content: '这是一条消息',
    direction: 'top-center',
    dragAllow: true,
    dragConfig: {
      triggerBoandary: 2,
    },
  });
};
</script>

<style scoped></style>
