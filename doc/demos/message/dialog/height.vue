<template>
  <m-dialog class="m-height">
    <template #active>
      <m-button>点击显示弹窗</m-button>
    </template>
    <div >山河风景元无异，城郭人民半已非。</div>
  </m-dialog>
</template>


<style scoped>
/** 这段css需要放到global中 **/
.m-height {
  --m-dialog-h: 600px;
}
</style>
<script setup lang="ts">
</script>
