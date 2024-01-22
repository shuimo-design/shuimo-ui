<template>
  <span>{{visible}}</span>
  <br/>
  <m-popover v-model:show="visible">
    <m-button text="点击我"/>
    <template #content>
      <div style="text-align: right; padding: 5px;background: #ffffff80;">
        <div>君不见，黄河之水天上来</div>
        <div>
          <m-button text="关闭" @click="closeDialog"></m-button>
          <m-button text="确定" @click="closeDialog"></m-button>
        </div>
      </div>
    </template>
  </m-popover>
</template>

<script setup lang="ts">
import { useDialog } from "shuimo-ui";
const { visible, closeDialog, showDialog } = useDialog();
</script>
