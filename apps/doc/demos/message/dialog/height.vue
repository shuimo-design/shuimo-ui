<template>
  <m-button @click="showDialog">点击显示弹窗</m-button>
  <m-dialog @close="closeDialog" :visible="visible">
    <div class="height">君不见，黄河之水天上来</div>
  </m-dialog>
</template>

<script setup lang="ts">

import { useDialog } from "shuimo-ui";

const { visible, closeDialog, showDialog } = useDialog();

</script>

<style scoped>
.height {
  height: 600px;
}
</style>
