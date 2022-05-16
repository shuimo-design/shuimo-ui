<template>
  <BaseTitle>位置</BaseTitle>
  <div>
    <w-button text="top-right" @click="callMessage('top-right')"/>
    <w-button text="top-left" @click="callMessage('top-left')"/>
    <w-button text="bottom-left" @click="callMessage('bottom-left')"/>
    <w-button text="bottom-right" @click="callMessage('bottom-right')"/>
    <w-button text="top-center" @click="callMessage('top-center')"/>
  </div>
  <BaseTitle>类型</BaseTitle>
  <div>
    <w-button text="success" @click="WMessage.success('这是一条信息')"></w-button>
    <w-button text="info" @click="WMessage.info('这是一条信息', 1000)"></w-button>
    <w-button text="warning" @click="WMessage.warning('这是一条信息')"></w-button>
    <w-button text="error" @click="WMessage.error('这是一条信息')"></w-button>
  </div>
</template>

<script setup lang="ts">
import { WMessage } from '../../../../lib';
import BaseTitle from '../../../components/base/BaseTitle.vue';

const callMessage = (direction: string) => {
  WMessage.success({ content: '这是一条信息', direction });
}
</script>
