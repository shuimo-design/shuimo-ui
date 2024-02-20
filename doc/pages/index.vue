<template>
  <div>
    <main class="entry-main">
      <LazyEntryComponentDialog/>
    </main>
    <footer>
      <a class="m-cursor-pointer" href="https://beian.miit.gov.cn" target="_blank">浙ICP备15017406号-2</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
/**
 * @Description: 首页
 * @Author: 阿怪
 * @Date: 2022/3/4 12:27 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
definePageMeta({
  layout: 'without-menu',
});

</script>

<style scoped>

.entry-main {
  height: calc(100vh - 102px);
  display: grid;
  grid-template-areas:  "container";
}


footer {
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100vw;
  height: 24px;
  line-height: 24px;
  background: rgba(51, 51, 51, 0.6);
  z-index: 10;
  font-size: 14px;

  & a {
    color: white;
    text-decoration: none;
  }
}
</style>
