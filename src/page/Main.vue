<template>
  <div class="base">
    <h1>一款粗暴的水墨UI</h1>
    <span>基于Vite2.0 + Vue3</span>
    <br/>
    <span>运用于 <w-button text="极客江湖" @click="toGeekjx"/></span>
    <w-divider/>
    <w-form>
      <w-form-item label="跳转到：">
        <w-button text="github" @click="toGithub"/>
      </w-form-item>
      <w-form-item label="跳转到：">
        <w-button text="npm" @click="toNpm"/>
      </w-form-item>
    </w-form>
  </div>
  <div class="footer cursor-brush">
    <span @click="toBeian">浙ICP备15017406号</span>
  </div>
</template>

<script lang="ts">
/**
 * @Description: 主页
 * @Author: 菩萨蛮
 * @Date: 2021/6/8 11:42 下午
 * @Version v1.0.0
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
      window.open('https://github.com/higuaifan/wash-painting-ui');
    },
    toNpm() {
      window.open('https://www.npmjs.com/package/@higuaifan/wash-painting-ui');
    },
    toBeian() {
      window.open('https://www.miit.gov.cn/');
    }
  }
});
</script>

<style lang="scss" scoped>

.base {
  margin: 10px 20px;
}

.footer {
  width: 100vw;
  background-color: #a3a3a3;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}

</style>
