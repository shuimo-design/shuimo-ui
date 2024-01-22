<template>
  <div>已选中：{{ data.join('，') }}</div>
  <m-checkbox-group v-model="data">
    <m-checkbox label="极客江湖" value="极客江湖"/>
    <m-checkbox label="水墨组件" value="水墨组件"/>
  </m-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref(['极客江湖', '水墨组件']);
</script>
