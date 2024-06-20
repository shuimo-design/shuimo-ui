<script setup lang="ts">
/**
 * @description vue playground
 * @author 阿怪
 * @date 2023/4/19 22:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { useDarkModeStorage } from 'shuimo-ui/index.ts';
import { onMounted, provide, ref } from 'vue';
import Base from './lib/Base.vue';
import Message from './lib/Message.vue';
import Other from './lib/Other.vue';
import Template from './lib/Template.vue';

type Category = {
  name: string;
  components: string[];
}

const categories: Category[] = [
  {
    name: 'Base',
    components: [
      'Avatar',
      'Button',
      'Checkbox',
      'DatePicker',
      'Input',
      'Li',
      'List',
      'Progress',
      'Radio',
      'Select',
      'Slider',
      'Switch',
      'Tag',
      'Tree',
    ],
  },
  {
    name: 'Message',
    components: ['Confirm', 'Dialog', 'Drawer', 'Message', 'Popover', 'Tooltip'],
  },
  {
    name: 'Other',
    components: ['DarkMode', 'Divider', 'Loading'],
  },
  {
    name: 'Template',
    components: [
      'Border',
      'Breadcrumb',
      'Form',
      'Menu',
      'Pagination',
      'RicePaper',
      'Table',
      'VirtualList',
      'Layout',
    ],
  },
];
const selectedCategory = ref<string | null>(categories[0].name);
const selectedComponent = ref<string | null>(categories[0]['components'][0]);
const componentOptionsRef = ref<Category['components']>(categories[0]['components']);

const getSelectedCategory = (c: Category) => {
  const name = c.name;
  componentOptionsRef.value = categories.find((item) => item.name === name)?.components ?? [];
  selectedComponent.value = componentOptionsRef.value[0];
};

provide('selected-component', selectedComponent);

// onMounted(() => {
//   localStorage.clear();
// });

const { darkModeRef, initDarkMode } = useDarkModeStorage();
</script>

<template>
  <div class="header">
    <div class="component-selects">
      <div>
        <m-select
          @select="getSelectedCategory"
          option-param="name"
          input-param="name"
          value-param="name"
          v-model="selectedCategory"
          :options="categories"/>
      </div>
      <div>
        <m-select
          v-model="selectedComponent"
          :optionsH="300"
          :options="componentOptionsRef"/>
      </div>
    </div>
    <m-dark-mode v-model="darkModeRef" :init-handler="initDarkMode"/>
  </div>
  <m-svg-wrapper>
    <div class="main">
      <Base/>
      <Message/>
      <Other/>
      <Template/>
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

.main {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
