<script setup lang="ts">
const val = ref(25);
</script>

<template>
  <span>{{val}}</span>
  <m-slider v-model="val" :min="-50" :max="50"/>
</template>

