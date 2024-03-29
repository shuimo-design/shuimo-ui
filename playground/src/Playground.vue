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
import { onMounted, Ref, ref, provide } from "vue";
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
      "Layout",
    ],
  },
];
const selecedClassly = ref<Ref<Component> | null>(null);
const sleectedComponent = ref<Ref<string> | null>(null);

const getSelecedClassly = (value: Component) => {
  selecedClassly.value = value;
  sleectedComponent.value=null;
};

provide("selected-component", sleectedComponent);

onMounted(() => {
  localStorage.clear();
});
onMounted(() => {
  localStorage.clear();
});

const { darkModeRef, initDarkMode } = useDarkModeStorage();
</script>

<template>
  <div class="header">
    <m-dark-mode v-model="darkModeRef" :init-handler="initDarkMode" />
    <div class="component-selects">
      <div>
        <m-select
          @select="getSelecedClassly"
          option-param="name"
          input-param="name"
          :options="componentNameArr"
        />
      </div>
      <div>
        <m-select
          v-model="sleectedComponent"
          optionsH="300"
          :options="selecedClassly?.component ?? []"
        />
      </div>
    </div>
  </div>
  <m-svg-wrapper>
    <div>
      <Base />
      <Message />
      <Other />
      <Template />
    </div>
  </m-svg-wrapper>
</template>

<style scoped>

.header {
  display: flex;
  align-items: center;
  height: 3rem;
  margin: 1rem 3rem;
}
.component-selects {
  justify-content: center;
  width: 100%;
  display: flex;
}
.select-item {
  flex: 1;
  margin-right: 10px;
}
.shuimo-svg-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
