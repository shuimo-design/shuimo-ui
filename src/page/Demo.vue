<template>
  <div class="demo">
    <div class="demo-header">
      <Header/>
    </div>
    <div class="main">
      <w-menu :menu="menuList" class="menu" @click="menuClick"/>
      <div class="main-page">
        <Mask>
          <router-view/>
        </Mask>
      </div>
    </div>
    <div class="footer w-cursor">
      <span @click="toBeian">浙ICP备15017406号-2</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:33
 **/
import { reactive } from 'vue';
import router from "../router";
import Header from "../components/Header.vue";
import Mask from "../components/Mask.vue";
import { MenuTypeArr } from "../../types/components/components";

const menuList: MenuTypeArr = reactive([
  { title: '首页', key: '', isActive: true },
  {
    title: '基础组件', key: 'button', isActive: false, children: [
      { title: '按钮', key: 'button', isActive: true },
      { title: '输入框', key: 'input', isActive: false },
      { title: '选择框', key: 'select', isActive: false },
      { title: '单选框', key: 'radio', isActive: false },
      { title: '复选框', key: 'checkbox', isActive: false },
      { title: '日期选择框', key: 'date-picker', isActive: false },
    ]
  },
  {
    title: '模版组件', key: 'form', isActive: false, children: [
      { title: '表单', key: 'form', isActive: false },
      { title: '列表', key: 'table', isActive: false },
      { title: '分页', key: 'pagination', isActive: false },
      { title: '标签页', key: 'tabs', isActive: false },
    ]
  },
  {
    title: '消息交互组件', key: 'dialog', isActive: false, children: [
      { title: '弹窗', key: 'dialog', isActive: false },
      { title: '提示', key: 'message', isActive: false },
      { title: '悬浮提示', key: 'tooltip', isActive: false },
      { title: '悬浮交互', key: 'popover', isActive: false },
    ]
  },
  {
    title: '其他组件', key: 'scroll-number', isActive: false, children: [
      { title: '数字滚动', key: 'scroll-number', isActive: false },
      { title: '文件上传', key: 'upload', isActive: false },
      { title: '控制台输出', key: 'print', isActive: false },
      { title: '分割线', key: 'divider', isActive: false },
      { title: '进度条', key: 'process', isActive: false },
      { title: '边框', key: 'border', isActive: false },
    ]
  }
]);

const menuClick = (index: number[]) => {
  let m;
  if (index.length === 1) {
    m = menuList[index[0]];
  } else {
    m = menuList[index[0]].children[index[1]];
  }
  router.push(`/${m.key}`);
}

const toBeian = () => {
  window.open('http://beian.miit.gov.cn/');
}

</script>

<style lang="scss" scoped>

.demo {
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.3);
  //backdrop-filter: blur(2px);
  overflow: hidden;

  .demo-header {
    display: inline-block;
    height: 100px;
    width: 100vw;
  }

  .main {
    display: inline-block;
    height: calc(100vh - 140px);
  }

  .menu {
    margin-left: 99px;
    height: 100%;
    width: 216px;
  }
}

.w-button {
  display: block;
}

.main-page {
  display: inline-block;
  float: right;
  width: calc(100vw - 355px);
  margin: 0 40px 0 0;
  height: 100%;
}

.footer {
  width: 100vw;
  background-color: rgba(200, 199, 199, 0.36);
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}

</style>
