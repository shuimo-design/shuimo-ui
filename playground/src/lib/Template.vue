<template>
  <div class="template">
    <ComponentsWrap name="Form">
      <m-form @submit="submitEvent">
        <m-form-item label="在下乃输入框：" prop="input">
          <m-input />
        </m-form-item>
        <m-form-item label="在下乃按钮：" prop="hello">
          <m-button text="点击按钮" />
        </m-form-item>
      </m-form>
    </ComponentsWrap>
    <ComponentsWrap name="Border">
      <m-border>
        <m-grid :gap="20" direction="column" class="screen">
          <m-grid :gap="5" :h="245">
            <m-cell :w="245">
              <img src="../assets/left.png" alt="" />
            </m-cell>
            <m-cell>
              <img src="../assets/right.png" alt="" />
            </m-cell>
          </m-grid>
          <m-grid :gap="5" :h="162" :gapRotate="[10, 20]">
            <m-cell :w="162">
              <img src="../assets/1.png" alt="" />
            </m-cell>
            <m-cell>
              <img src="../assets/3.png" alt="" />
            </m-cell>
            <m-cell>
              <img src="../assets/2.png" alt="" />
            </m-cell>
          </m-grid>
        </m-grid>
      </m-border>
    </ComponentsWrap>
    <ComponentsWrap name="Pagination">
      <span>current:{{ current }}</span>
      <m-pagination :total="225" v-model="current"></m-pagination>
      <div class="width-400">
        <m-pagination :total="225" v-model="current"></m-pagination>
      </div>
      <div class="width-500">
        <m-pagination :total="225" v-model="current"></m-pagination>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Breadcrumb">
      <div class="breadcrumb">
        <m-breadcrumb separator="/">
          <m-breadcrumb-item>bread-1</m-breadcrumb-item>
          <m-breadcrumb-item>bread-2</m-breadcrumb-item>
        </m-breadcrumb>
        <m-breadcrumb>
          <template #separator>#</template>
          <m-breadcrumb-item content="bread-3" />
          <m-breadcrumb-item content="bread-4" />
        </m-breadcrumb>
        <m-breadcrumb>
          <m-breadcrumb-item content="bread-5" />
          <m-breadcrumb-item content="bread-7" />
        </m-breadcrumb>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="VirtualList">
      <span>{{ baseList.length }}</span>
      <m-virtual-list class="max-height" :list="baseList" v-if="false">
        <template #default="data">
          <div class="virtual-list-item">{{ data }}</div>
        </template>
      </m-virtual-list>
      <m-divider />
      <span>{{ optionsMore.length }}</span>
      <m-virtual-list class="max-height" :list="optionsMore">
        <template #default="data">
          <div class="virtual-list-item">{{ data }}</div>
        </template>
      </m-virtual-list>
    </ComponentsWrap>
    <ComponentsWrap name="Menu">
      <!--  <MTree/>-->
      <m-loading :mask="false" :size="2" :speed="500"></m-loading>
      <m-menu :data="menu" :config="{ label: 'title' }" />
      <!--    <m-tree :data="menu" :config="{label:'title',route:'route1'}"/>-->
      <m-tree :data="menu" :config="{ label: 'title' }" />
    </ComponentsWrap>
    <ComponentsWrap name="Table">
      <m-table class="width-400" :data="tableDataRef" :param-class="true">
        <m-table-column label="姓名" param="name"></m-table-column>
        <m-table-column label="地址" param="address" width="200"></m-table-column>
        <m-table-column label="年龄" param="age"></m-table-column>
      </m-table>
    </ComponentsWrap>
    <ComponentsWrap name="RicePaper">
      <div class="animation">
        <m-button @click="toggleVisible">toggleVisible</m-button>
        <transition name="m-layout">
          <div class="filter-div" v-if="riceVisibleRef">
            <m-rice-paper
              :style="{
                '&#45;&#45;m-rice-paper-mountains-opacity': 0.2,
              }"
            >
              <div class="inside-div" />
            </m-rice-paper>
          </div>
        </transition>
      </div>
    </ComponentsWrap>
  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 17:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from "vue";
import ComponentsWrap from "../components/ComponentsWrap.vue";

const riceVisibleRef = ref(false);
const toggleVisible = () => (riceVisibleRef.value = !riceVisibleRef.value);

const submitEvent = () => {
  console.log("submitEvent");
};

const tableDataRef = ref([
  {
    name: "不长",
    address:
      "这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长这段内容很长很长",
    age: 18,
  },
]);

const current = ref(1);

const init = (base = 0) => {
  const deg = ref(base);
  const add = () => deg.value++;
  const sub = () => deg.value--;

  return [deg, add, sub];
};

const [A, addA, subA] = init(0);
const [B, addB, subB] = init(0);
const [C, addC, subC] = init(2);
const [D, addD, subD] = init(10);

// const baseList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const baseList = [
  "子1",
  "丑2",
  "寅3",
  "卯4",
  "辰5",
  "巳6",
  "午7",
  "未8",
  "申9",
  "酉10",
  "戌11",
  "亥12",
];
const optionsMore = Array.from({ length: 10 }).fill(baseList).flat();

const menu = [
  {
    title: "首页",
    route: "main",
    isActive: true,
    children: [
      { title: "快速开始", route: "quickStart", isActive: false },
      { title: "颜色", route: "color", isActive: false },
      { title: "从wash-painting升级", route: "w2m", isActive: false },
    ],
  },

  {
    title: "基础组件",
    route: "button",
    isActive: false,
    children: [
      { title: "按钮", route: "button", isActive: false },
      { title: "输入框", route: "input", isActive: false },
      { title: "单选框", route: "radio", isActive: false },
      { title: "复选框", route: "checkbox", isActive: false },
      { title: "选择框", route: "select", isActive: false },
      { title: "日期选择框", route: "datePicker", isActive: false },
      { title: "列表", route: "list", isActive: false },
      { title: "开关", route: "switch", isActive: false },
      { title: "标签", route: "tag", isActive: false },
    ],
  },
  {
    title: "模版组件",
    route: "form",
    isActive: false,
    children: [
      { title: "表单", route: "form", isActive: false },
      { title: "列表", route: "table", isActive: false },
      { title: "分页", route: "pagination", isActive: false },
      { title: "宣纸布局", route: "rice-paper", isActive: false },
    ],
  },
  {
    title: "消息组件",
    route: "dialog",
    isActive: false,
    children: [
      { title: "弹窗", route: "dialog", isActive: false },
      { title: "抽屉", route: "drawer", isActive: false },
      { title: "提示", route: "message", isActive: false },
      { title: "气泡卡片", route: "popover", isActive: false },
      { title: "悬浮提示", route: "tooltip", isActive: false },
      { title: "确认框", route: "confirm", isActive: false },
    ],
  },
  {
    title: "其他组件",
    route: "upload",
    isActive: false,
    children: [
      { title: "文件上传", route: "upload", isActive: false },
      { title: "控制台打印", route: "printer", isActive: false },
      { title: "分割线", route: "divider", isActive: false },
      { title: "进度条", route: "progress", isActive: false },
      { title: "边框", route: "border", isActive: false },
      { title: "滚动条", route: "scroll", isActive: false },
      { title: "加载", route: "loading", isActive: false },
    ],
  },
];
</script>

<style scoped>
.m-pagination {
  justify-content: space-between;
}

.w-200-overflow.m-pagination {
  justify-content: space-between;
}

.w-140-overflow-hidden {
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.width-400 {
  width: 400px;
}

.width-500 {
  width: 500px;
}

.template {
}

.cell-wrapper {
  height: 600px;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.screen {
  width: 500px;
  height: 728px;
}

.template-cell {
  margin-left: -58px;
}

.buttons {
  height: 150px;
}

.button .m-button {
  margin: 0 4px;
}

.button span {
  display: inline-block;
  width: 100px;
  text-align: center;
}

.virtual-list-item {
  width: 300px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  border: 3px solid gray;
  margin: 4px 0;
  padding: 2px;
  text-align: center;
  font-size: 20px;
}

.max-height {
  height: 300px;
}

.row-flex {
  display: flex;
  flex-direction: row;
}

-hidden {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.width-400 {
  width: 400px;
}

.width-500 {
  width: 500px;
}

.template {
}

.cell-wrapper {
  height: 600px;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.screen {
  width: 500px;
  height: 728px;
}

.template-cell {
  margin-left: -58px;
}

.buttons {
  height: 150px;
}

.button .m-button {
  margin: 0 4px;
}

.button span {
  display: inline-block;
  width: 100px;
  text-align: center;
}

.virtual-list-item {
  width: 300px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  border: 3px solid gray;
  margin: 4px 0;
  padding: 2px;
  text-align: center;
  font-size: 20px;
}

.max-height {
  height: 300px;
}

.row-flex {
  display: flex;
  flex-direction: row;
}

.filter-div {
  /* demo中为了更好看一点 */
  width: 400px;
  height: 400px;
  //background: white;
}

.inside-div {
  margin: 25px;
  height: 350px;
  width: 350px;
  background: var(--m-color-text);
  opacity: 0.2;
  border-radius: 50%;
}

.animation {
  height: 500px;
  width: 500px;
}
</style>
