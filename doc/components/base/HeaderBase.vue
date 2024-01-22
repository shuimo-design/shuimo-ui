<template>
  <header class="header">
    <div class="header-title">
      <span>水墨UI</span>
    </div>
    <m-dark-mode v-model="darkModeRef" :init-handler="initDarkMode"/>
    <HeaderButton v-if="showIndexButton" :url="'/'">回到首页</HeaderButton>
    <HeaderButton v-if="!showIndexButton" :url="'/main'">进入组件</HeaderButton>
    <HeaderButton :url="'https://github.com/janghood/shuimo-ui'" target="_blank">
      代码仓库
    </HeaderButton>
    <div class="header-line"/>
  </header>
</template>

<script lang="ts" setup>
/**
 * @Description: header模块
 * @Author: 阿怪
 * @Date: 2021/7/20 2:53 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import HeaderButton from './HeaderButton.vue';
import { useDarkModeStorage } from 'shuimo-ui';

defineProps({
  showIndexButton: { type: Boolean, default: true }
});

const { darkModeRef, initDarkMode } = useDarkModeStorage();
</script>

<style scoped>

.header {
  width: calc(100% - 104px);
  margin: 34px 41px 0 63px;
}

.header-title {
  display: inline-block;
  position: relative;
  top: 0;
  background: url(/img/base/header/header_bg.png) no-repeat;
  width: 466px;
  height: 63px;

  & span {
    display: inline-block;
    padding: 0 0 0 24px;
    line-height: 63px;
    font-size: 24px;
    color: white;
    text-shadow: 1px 1px 6px rgba(255, 255, 255, 0.7);
    font-family: var(--wljh);
  }
}

.header-line {
  position: relative;
  top: -11px;
  left: 18px;
  background: url(/img/base/header/crossrange.png) repeat-x;
  width: 100%;
  height: 5px;
}

.header-button {
  margin-top: -30px;
}

.m-dark-mode {
  margin-left: 10px;
  float: right;
}

</style>
