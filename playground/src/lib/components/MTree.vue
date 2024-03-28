<script setup lang="ts">
/**
 * @description tree demo
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 */
import { MTree } from 'shuimo-ui/index';
import { ref } from 'vue';
import type { TreeData } from 'shuimo-ui/components/base/tree';

const checkedKeys = ref<Array<string | number>>(['12', '22', '3']);

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
      disabled: i % 2 === 0,
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
// console.log('mock data=> ', mockData);
const treeData = ref(mockData);
const d = generateMockData(5);
</script>

<template>
  <div>
    {{ checkedKeys }}
    <br/>
    <div class="tree">
      <m-tree checkbox :check-strictly="false" v-model:checkedKeys="checkedKeys" :data="d"
              :default-expand-all="true"></m-tree>
    </div>
    <br/>
    <div>
      <m-tree checkbox :data="treeData"/>
    </div>
  </div>
</template>

<style scoped lang="css">
:global(.flex) {
  justify-content: flex-start;
}

.tree {
  height: 50vh;
  overflow-y: auto;
}
</style>
