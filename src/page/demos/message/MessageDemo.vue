<template>
  <BaseTitle>位置</BaseTitle>
  <div>
    <m-button text="top-right" @click="callMessage('top-right')"/>
    <m-button text="top-left" @click="callMessage('top-left')"/>
    <m-button text="bottom-left" @click="callMessage('bottom-left')"/>
    <m-button text="bottom-right" @click="callMessage('bottom-right')"/>
    <m-button text="top-center" @click="callMessage('top-center')"/>
  </div>
  <BaseTitle>类型</BaseTitle>
  <div>
    <m-button text="success" @click="MMessage.success('这是一条信息')"></m-button>
    <m-button text="info" @click="MMessage.info('这是一条信息', 1000)"></m-button>
    <m-button text="warning" @click="MMessage.warning('这是一条信息')"></m-button>
    <m-button text="error" @click="MMessage.error('这是一条信息')"></m-button>
  </div>
</template>

<script setup lang="ts">
import { MMessage } from '../../../../lib';
import BaseTitle from '../../../components/base/BaseTitle.vue';
import { MessageDirectionType } from "../../../../types/components/MMessage";

const callMessage = async (direction: MessageDirectionType) => {
  const res = await MMessage.success({ content: '这是一条信息', direction });
  console.log(typeof res);
}
</script>
