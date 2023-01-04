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
const value = ref(false);

const toggleActive = () => {
  value.value = !value.value;
};


</script>

<template>

  <span>{{ value }}</span>

  <ul>
    <m-li>
      <span>hi</span>
    </m-li>
    <m-li :active="value" @click="toggleActive">SL-hi-yg好</m-li>
    <m-li>hi5</m-li>
  </ul>

  <li>hi</li>
  <li>hi6</li>


</template>

<style scoped>

m-button {
  margin: 4px;
}

.test {
  height: 200px;
  line-height: 200px;
  font-size: 40px;
}

ul {
}

li {

}

li::marker {
  content: url(./assets/active_icon.png);
  font-size: 20px;
}

</style>
