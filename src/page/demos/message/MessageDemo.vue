<template>
  <BaseTitle>位置</BaseTitle>
  <div>
    <w-button text="top-right" @click="callMessagePlugin('top-right')"/>
    <w-button text="top-left" @click="callMessagePlugin('top-left')"/>
    <w-button text="bottom-left" @click="callMessagePlugin('bottom-left')"/>
    <w-button text="bottom-right" @click="callMessagePlugin('bottom-right')"/>
    <w-button text="top-center" @click="callMessagePlugin('top-center')"/>
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

const callMessagePlugin = (direction: string) => {
  WMessage.success({ content: '这是一条信息', direction });
}
</script>
