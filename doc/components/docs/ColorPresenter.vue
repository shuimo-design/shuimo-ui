<template>
  <div class="m-color m-cursor-pointer" @click="copy">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
/**
 * @Description:
 * @Author: 阿怪
 * @Date: 2022/3/6 1:53 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * todo 可选是否复制
 */
import { computed, useSlots } from 'vue';
import { MMessage, MPrinter } from 'shuimo-ui';

const props = defineProps<{
  color: string;
  fontColor?: string;
}>();

const slot = useSlots();
const colorClassVar = `--m-color-${props.color}`;
const colorValue = computed(() => `var(${colorClassVar},white)`);
const fontColor = props.fontColor || 'white';

const fontSize = computed(() => String(slot.default!()[0].children).length === 2 ? '40px' : '28px');

const copy = () => {
  navigator.clipboard.writeText(colorClassVar).then(() => {
    MMessage.success(`已将样式${colorClassVar}复制到剪贴板！`);
  }, e => {
    MPrinter('颜色复制').error(e);
    MMessage.error('复制失败！');
  });
};

</script>

<style scoped>

.m-color {
  display: inline-block;
  height: 100px;
  width: 100px;
  border-radius: 4px;
  background: v-bind(colorValue);
  color: v-bind(fontColor);
  text-align: center;
  font-family: var(--wljh);
  font-size: v-bind(fontSize);
  line-height: 100px;
  writing-mode: vertical-lr;
  margin: 10px;
}

</style>
