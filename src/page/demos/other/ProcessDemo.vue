<template>
  <div class="process">
    <span>进度条</span>
    <w-process :per="0.7"/>
    <br/>
    <w-process :per="loopPer"/>
    <br/>
    <w-process :height="38" :width="898" :per="loopPer"
               :text="text"
               :prepend="{text:'exp'}"/>
    <br/>
    <w-process :height="38" :width="898" :per="0.1" text="测试文案" :prepend="{text:'exp',position:'right'}"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description: 进度条demo
 * @Author: 菩萨蛮
 * @Date: 2021/2/25 2:44 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { ref, computed } from 'vue';

const loopPer = ref(0);
setInterval(() => {
  if (loopPer.value < 1) {
    loopPer.value += 0.001;
  } else {
    loopPer.value = 0;
  }
}, 16);

const text = computed(() => {
  const num = Math.floor(loopPer.value * 100);
  return '进度条百分比:' + num + '%'; // 插件改天处理下模版语法的渲染问题
})
</script>
