<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

const value = ref([
  { title: '标题1', children: [{ title: '标题1-1' }] },
  { title: '标题2' }
]);

const active = ref(false);
const active2 = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};
const toggleActive2 = () => {
  active2.value = !active2.value;
};

</script>

<template>

  <m-menu>
    <m-menu-item>测试</m-menu-item>
    <m-menu-item>
      测试2
      <m-menu-item slot="sub">测试2-1</m-menu-item>
      <m-menu-item slot="sub">测试2-2</m-menu-item>
    </m-menu-item>
    <m-menu-item :active="active">
      测试3
      <m-menu-item slot="sub">测试3-2</m-menu-item>
      <m-menu-item slot="sub" :active="active2">
        测试3-1
        <m-menu-item slot="sub">测试3-1-1</m-menu-item>
      </m-menu-item>
    </m-menu-item>
  </m-menu>

</template>

<style scoped>

m-button {
  margin: 4px;
}

m-menu{
  width: 200px;
}

.test {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
}

</style>
