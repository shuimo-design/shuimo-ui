<template>
  <m-button @click="showDialog">点击显示抽屉</m-button>
  <m-drawer @close="closeDialog" :visible="visible">
    <span>君不见，黄河之水天上来</span>
    <m-button @click="closeDialog">关闭</m-button>
  </m-drawer>
</template>

<script setup lang="ts">

import { useDialog } from "shuimo-ui";

const { visible, closeDialog, showDialog } = useDialog();

</script>

