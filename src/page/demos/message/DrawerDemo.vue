<template>
  <div>
    <w-button text="点击显示抽屉" @click="show"/>
    <w-drawer :visible="visible" @close="close">
      <div>
        <span>普通抽屉</span>
        <w-button text="关闭" @click="close"/>
      </div>
    </w-drawer>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description: 抽屉组件demo
 * @Author: 菩萨蛮
 * @Date: 2021/8/24 11:29 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';

const visible = ref(false);

const show = () => {visible.value = true};
const close = () => {visible.value = false};

</script>
