<template>
  <m-button @click="buttonClick">点击事件</m-button>
</template>

<script setup lang="ts">
import { MMessage } from 'shuimo-ui';

const buttonClick = () => {
  MMessage.success('点击事件触发');
}
</script>
