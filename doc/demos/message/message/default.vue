<template>
  <m-button @click="callMessage">点击显示Message</m-button>
</template>

<script setup lang="ts">

import { MMessage } from 'shuimo-ui';


const callMessage = () => {
  MMessage.success('success的message');
  MMessage.warning('warning的message');
  MMessage.info('info的message');
  MMessage({
    content: 'normal',
    direction: 'top-right',
  });
};


</script>

<style scoped>

</style>
