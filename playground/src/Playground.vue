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

<template>
  <div class="header">
    <m-dark-mode/>
  </div>
  <div class="playground">
    <Template/>
  </div>
</template>

<style scoped>

.header {
  height: 3rem;
  margin: 1rem 3rem;
}

.playground {
  width: 100vw;
  height: calc(100vh - 5rem);

  display: flex;
  justify-content: center;
  align-items: center;

}

</style>
