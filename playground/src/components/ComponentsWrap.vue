<template>
  <div v-if="props.name === componentNameInject">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
  name: String,
});
let componentNameInject = inject<string>('selected-component');
</script>
