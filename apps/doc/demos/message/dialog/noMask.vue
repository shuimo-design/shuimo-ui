<template>
  <m-button @click="showDialog">点击显示弹窗</m-button>
  <m-dialog @close="closeDialog" :visible="visible" :mask="{show:false}">
    <span>君不见，黄河之水天上来</span>
  </m-dialog>
</template>

<script setup lang="ts">

import { useDialog } from "shuimo-ui";

const { visible, closeDialog, showDialog } = useDialog();

</script>
