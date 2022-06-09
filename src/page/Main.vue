<template>
  <div class="base">
    <img src="/src/assets/logo.png" alt="">
    <h1>一款粗暴的水墨UI</h1>
    <span>基于Vite2.0 + Vue3</span>
    <br/>
    <span>运用于 <m-button text="极客江湖" @click="toGeekjx"/></span>
    <m-divider/>
    <m-form>
      <m-form-item label="跳转到：">
        <m-button text="github" @click="toGithub"/>
      </m-form-item>
      <m-form-item label="跳转到：">
        <m-button text="npm" @click="toNpm"/>
      </m-form-item>
    </m-form>
  </div>
</template>

<script lang="ts">
/**
 * @description 主页
 * @author 阿怪
 * @date 2021/6/8 11:42 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Main',
  methods: {
    toGeekjx() {
      window.open('https://geekjx.com');
    },
    toGithub() {
      window.open('https://github.com/higuaifan/shuimo-ui');
    },
    toNpm() {
      window.open('https://www.npmjs.com/package/@janghood/shuimo-ui');
    },
  }
});
</script>

<style lang="scss" scoped>

.base {
  margin: 10px 20px;
}

</style>
