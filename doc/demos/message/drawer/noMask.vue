<template>
  <m-drawer @close="closeDialog" v-model:visible="visible" :mask="{show:false}">
    <template #active>
      <m-button>点击显示抽屉</m-button>
    </template>
    <span>君不见，黄河之水天上来</span>
    <m-button @click="closeDialog">关闭</m-button>
  </m-drawer>
</template>

<script setup lang="ts">

import { useDialog } from 'shuimo-ui';

const { visible, closeDialog } = useDialog();

</script>
