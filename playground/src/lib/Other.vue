<template>
  <div class="other flex">
    <ComponentsWrap name="Loading">
      <m-loading :speed="0" />
      <m-loading mask />
      <m-loading mask :side-length="300" />
    </ComponentsWrap>
    <ComponentsWrap name="Divider">
      <div class="Divider">
        <m-divider />
        <m-divider />
        <div style="height: 200px">
          <m-divider vertical />
        </div>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="DarkMode">
      <m-dark-mode
        v-model="darkModeRef"
        :init-handler="initHandler"
        @change="onChangeMode"
      />
    </ComponentsWrap>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 09:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";
import ComponentsWrap from "../components/ComponentsWrap.vue";

const darkModeRef = ref(false);
const initHandler = () => {
  const darkMode = localStorage.getItem("shuimo-blog-dark-mode");
  darkModeRef.value = darkMode === "true";

  console.log(darkModeRef.value);
  return false;
};

const onChangeMode = (val: string) => {
  console.log("change mode", val);
  localStorage.setItem("shuimo-blog-dark-mode", val);
};
</script>

<style scoped>
.divider {
  width: 20rem;
}
</style>
