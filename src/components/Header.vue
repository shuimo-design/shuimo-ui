<template>
  <div class="header">
    <div class="header-title">
      <span>水墨UI</span>
    </div>
    <HeaderButton v-if="showButton" @click="toHome">回到首页</HeaderButton>
    <HeaderButton v-if="!showButton" @click="toDemo">进入组件</HeaderButton>
    <div class="header-line"/>
  </div>
</template>

<script setup lang="ts">
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/7/20 2:53 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import HeaderButton from '../components/entry/HeaderButton.vue'
import { useRouter } from 'vue-router';

const { showButton } = defineProps({
  showButton: { type: Boolean, default: true }
})

const router = useRouter();
const toHome = () => {
  router.push('/');
}
const toDemo = () => {
  router.push('/demo');
}
</script>

<style lang="scss" scoped>

.header {
  width: calc(100% - 104px);
  margin: 34px 41px 0 63px;
}

.header-title {
  display: inline-block;
  position: relative;
  top: 0;
  background: url(/src/assets/header/header_bg.png) no-repeat;
  width: 466px;
  height: 63px;

  span {
    display: inline-block;
    padding: 0 0 0 24px;
    line-height: 63px;
    font-size: 24px;
    color: white;
    text-shadow: 1px 1px 6px rgba(255, 255, 255, 0.7);
    font-family: wljh, serif;
  }
}

.header-line {
  position: relative;
  top: -11px;
  left: 18px;
  background: url(/src/assets/header/crossrange.png) repeat-x;
  width: 100%;
  height: 5px;
}

.header-button {
  margin-top: -30px;
}

</style>
