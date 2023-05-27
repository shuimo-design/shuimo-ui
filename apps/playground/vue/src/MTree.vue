<script setup lang="ts">
import { MTree } from "shuimo-ui/index";
import {TreeData} from "@shuimo-design/core/lib/base/tree";
import { ref } from 'vue'

function generateUniqueKey(): string {
  return Math.random().toString(36).substr(2, 9);
}
function generateMockData(level: number): TreeData[] {
  const data: TreeData[] = [];

  for (let i = 1; i <= level; i++) {
    const item: TreeData = {
      key: generateUniqueKey(),
      label: `Level ${i}`,
      value: `Value ${i}`,
      children: [],
    };

    if (i < level) {
      item.children = generateMockData(level - 1);
    }

    data.push(item);
  }

  return data;
}

const maxLevel = 3;
const mockData = generateMockData(maxLevel);
console.log('mock data=> ', mockData)
const treeData = ref(mockData)
</script>

<template>
  <div class="flex">
    <div>
      <MTree :data="treeData"></MTree>
    </div>
  </div>
</template>

<style scoped lang="css">

</style>
