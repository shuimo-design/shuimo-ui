<script setup lang="ts">
/**
 * @description vue playground
 * @author 阿怪
 * @date 2023/4/19 22:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useDarkModeStorage } from "shuimo-ui/index.ts";
import { Ref, onMounted, ref } from "vue";
import { provide } from "vue";
import Base from "./lib/Base.vue";
import Message from "./lib/Message.vue";
import Other from "./lib/Other.vue";
import Template from "./lib/Template.vue";

interface Component {
  name: string;
  component: string[];
}
type ComponentNameArr = Component[];

const componentNameArr: ComponentNameArr = [
  {
    name: "Base",
    component: [
      "Avatar",
      "Button",
      "Checkbox",
      "DatePicker",
      "Input",
      "Li",
      "List",
      "Progress",
      "Radio",
      "Select",
      "Slider",
      "Switch",
      "Tag",
      "Tree",
    ],
  },
  {
    name: "Message",
    component: ["Confirm", "Dialog", "Drawer", "Message", "Popover", "Tooltip"],
  },
  {
    name: "Other",
    component: ["DarkMode", "Divider", "Loading"],
  },
  {
    name: "Template",
    component: [
      "Border",
      "Breadcrumb",
      "Form",
      "Menu",
      "Pagination",
      "RicePaper",
      "Table",
      "VirtualList",
    ],
  },
];
const selecedClassly = ref<Ref<Component> | null>(null);
const sleectedComponent = ref<Ref<string> | null>(null);

provide("selected-component", sleectedComponent);

onMounted(() => {
  localStorage.clear();
});

const { darkModeRef, initDarkMode } = useDarkModeStorage();
</script>

<template>
  <div class="header">
    <m-dark-mode v-model="darkModeRef" :init-handler="initDarkMode" />
  </div>
  <div class="playground">
    <div class="floating-component">
      <div class="container">
        <div>
          您选择的是：{{ selecedClassly?.name }}<br />
          <m-select
            v-model="selecedClassly"
            option-param="name"
            input-param="name"
            :options="componentNameArr"
          />
        </div>
        <div>
          您选择的组件是: {{ sleectedComponent }}<br />
          <m-select
            v-model="sleectedComponent"
            optionsH="300"
            :options="selecedClassly?.component ?? []"
          />
        </div>
      </div>
    </div>
    <Base />
    <Message />
    <Other />
    <Template />
  </div>
</template>

<style scoped>
.header {
  height: 3rem;
  margin: 1rem 3rem;
}

.playground {
  width: 100vw;
  height: calc(100vh - 5rem);

  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-component {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0);
  z-index: 9999;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.select-item {
  flex: 1;
  margin-right: 10px;
}
</style>
