<template>
  <div>
    <header>
      <img class="logo" alt="" src="/svg/logo.svg">
      <h1>{{ $t('水墨UI') }}</h1>
    </header>
    <m-divider/>
    <div class="introduce">
      <br/>
      <h2>{{ $t('这是一款开箱即用的') }}} <b>{{ $t('水墨风') }}</b> {{ $t('组件库。') }}</h2>
      <br/>
      <p>{{ $t('我们注意到有许多优秀的企业级UI设计语言和组件库。') }}</p>
      <p> {{ $t('作为炎黄子孙，我们十分推崇中国独有的美术风格：水墨。') }}</p>
      <p>{{$t('我们整理出了一套具有中国传统风格的水墨风组件库。')}}</p>
      <p>{{$t('希望这款中国传统风格的组件库，能用于一些小众的需求，能满足于一些对页面有美术追求，又希望能快速搭建的用户。')}}</p>
      <p>{{$t('同时，我们希望能尽一分小小的力量，让更多人了解中国传统文化。')}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/5/5 08:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


</script>

<style scoped>
.home header {
  text-align: center;
}

.logo {
  height: 200px;
  width: 200px;
}

.introduce {
  text-align: center;
  line-height: 30px;
}
</style>
