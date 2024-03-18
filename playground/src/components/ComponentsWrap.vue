<template>
  <div v-if="props.name === componenNameInject">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";

const props = defineProps({
  name: String,
});
let componenNameInject = inject<string>("selected-component");
</script>
