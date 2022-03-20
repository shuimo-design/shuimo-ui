<template>
  <div class="entry">
    <Header :show-button="false"/>
    <div class="entry-main">
      <Component/>
    </div>
    <footer >
      <a herf="https://beian.miit.gov.cn" target="_blank">浙ICP备15017406号-2</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import Component from '../components/entry/Component.vue'
import Header from '../components/Header.vue'
</script>

<style scoped lang="scss">

.entry{
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.entry-main {
  height: calc(100vh - 100px);
  display: grid;
  grid-template-areas:  "container";
}

.component {
  grid-area: container;
}

footer{
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100vw;
  height: 24px;
  line-height: 24px;
  background: rgba(51, 51, 51, 0.6);

  a{
    color: white;
  }
}
</style>
