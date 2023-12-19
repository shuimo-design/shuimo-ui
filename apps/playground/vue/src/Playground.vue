<template>
  <div class="m-rice-paper-inside">
    <h1>这里是vue的playground</h1>
    <m-breadcrumb separator="/">
      <m-breadcrumb-item>bread-1</m-breadcrumb-item>
      <m-breadcrumb-item>bread-2</m-breadcrumb-item>
    </m-breadcrumb>

    <m-breadcrumb>
      <template #separator>#</template>
      <m-breadcrumb-item content="bread-3"/>
      <m-breadcrumb-item content="bread-4"/>
    </m-breadcrumb>

    <m-breadcrumb>
      <m-breadcrumb-item content="bread-5"/>
      <m-breadcrumb-item content="bread-7"/>
    </m-breadcrumb>
  </div>
</template>

<script setup lang="ts">
/**
 * @description vue playground
 * @author 阿怪
 * @date 2023/4/19 22:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Base from './Base.vue';
import Other from './Other.vue';
import Template from './Template.vue';
import Message from './Message.vue';


</script>

<style scoped>

</style>
