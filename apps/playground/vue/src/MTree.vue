<script setup lang="ts">
import { MTree } from "shuimo-ui/index";
import { TreeData } from "@shuimo-design/core/lib/base/tree";
import { ref } from 'vue'

const checkedKeys = ref<Array<string | number>>(['12', '22', '3'])

function generateMockData(level: number, pLevel?: string, pKey?: string): TreeData[] {
  const data: TreeData[] = [];
  for (let i = 1; i <= level; i++) {
    const l = `Level ${i}`;
    const key = pKey ? `${pKey}${i}` : `${i}`;
    const label = pLevel ? `${pLevel}-${l}` : l;
    const item: TreeData = {
      key,
      label,
      value: `Value ${i}`,
      children: [],
    };

    if (i < level) {
      item.children = generateMockData(level - 1, label, key);
    }

    data.push(item);
  }

  return data;
}

const maxLevel = 3;
const mockData = generateMockData(maxLevel);
console.log('mock data=> ', mockData)
const treeData = ref(mockData)
const d = generateMockData(5)
</script>

<template>
  <div>
    {{ checkedKeys }}
    <br />
    <div>
      <MTree checkable v-model:checkedKeys="checkedKeys"  :data="d" :default-expand-all="true"></MTree>
    </div>
    <br />
    <div>
      <MTree :data="treeData">
      </MTree>
    </div>
  </div>
</template>

<style scoped lang="css">
</style>
