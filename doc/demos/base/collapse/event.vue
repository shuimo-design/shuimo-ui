<template>
  <m-collapse v-model="isOpen" @change="handleChange">
    庭院深深深几许
    <template #content>
      乱红飞过秋千去
    </template>
  </m-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const handleChange = (value: boolean) => {
  console.log('折叠面板状态改变：', value);
};
</script>
