<template>
  <m-button text="点击弹出确认框" @click="showConfirm"/>
</template>

<script setup lang="ts">
import { MConfirm, MPrinter } from "shuimo-ui";

const showConfirm = async () => {
  const res = await MConfirm({
    content: '君不见，黄河之水天上来'
  });
  MPrinter('水墨确认组件').info(res);
}

</script>
