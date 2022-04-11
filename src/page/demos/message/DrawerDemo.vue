<template>
  <div>
    <w-button text="点击显示抽屉" @click="show"/>
    <w-drawer :visible="visible" @close="close" >
      <div>
        <span>普通抽屉</span>
        <w-button text="关闭" @click="close"/>
      </div>
    </w-drawer>
    <w-button text="点击显示无蒙板抽屉" @click="show2"/>
    <w-drawer :visible="visible2" @close="close2" :mask="mask">
      <div>
        <span>无蒙板抽屉</span>
        <w-button text="关闭" @click="close2"/>
      </div>
    </w-drawer>
  </div>
</template>

<script setup lang="ts">
/**
 * @description 抽屉组件demo
 * @author 阿怪
 * @date 2021/8/24 11:29 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);

const show = () => {visible.value = true};
const close = () => {visible.value = false};
const show2 = () => {visible2.value = true};
const close2 = () => {visible2.value = false};

const mask = { show: false, clickClose: false };


</script>
