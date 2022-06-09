<template>
  <div class="m-color">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
/**
 *
 * @author 阿怪
 * @date 2022/3/6 1:53 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { computed, useSlots } from "vue";

const props = defineProps<{
  color: string,
  fontColor?: string
}>();

const slot = useSlots();

const colorValue = computed(() => `var(--m-color-${props.color},white)`);
const fontColor = props.fontColor || 'white';

const fontSize = computed(() => String(slot.default!()[0].children).length === 2 ? '40px' : '28px');

</script>

<style lang="scss" scoped>

.m-color {
  display: inline-block;
  height: 100px;
  width: 100px;
  border-radius: 4px;
  background: v-bind(colorValue);
  color: v-bind(fontColor);
  text-align: center;
  font-family: wljh, serif;
  font-size: v-bind(fontSize);
  line-height: 100px;
  writing-mode: vertical-lr;
  margin: 10px;
}

</style>
