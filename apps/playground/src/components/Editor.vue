<template>
  <sp-border>
    <div class="editor" ref="dom"></div>
  </sp-border>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/3/31 15:16
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { onMounted, ref } from 'vue';
import useMonaco from '../compositions/editor/useMonaco';

const props = defineProps<{ modelValue: string, language: string }>();
const emits = defineEmits(['update:modelValue']);
const dom = ref();

const { createMonaco } = useMonaco();
const m = ref();
const initEditor = () => {
  m.value = createMonaco({
    value: props.modelValue,
    dom: dom.value,
    language: props.language,
    event: {
      onDidBlurEditorText: value => {
        emits('update:modelValue', value);
      }
    }
  });
};

onMounted(() => {
  initEditor();
});


</script>

<style lang="scss" scoped>

</style>
