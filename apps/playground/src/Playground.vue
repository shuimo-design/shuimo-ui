<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, computed, onMounted } from 'vue';

const pConsole = (str: any) => {
  console.group(`%c playground print`, 'color:#4A9992');
  console.log(str);
  console.groupEnd();
};

const isVUE = computed(() => {
  return import.meta.env.MODE === 'vue';
});

const value = ref([
  { title: '标题1', children: [{ title: '标题1-1' }] },
  { title: '标题2' }
]);

const disabled = ref(false);
const active2 = ref(false);
const input = ref('hello');
const type = ref('default');
const toggleActive = () => {
  input.value = input.value === 'hello' ? '' : 'hello';
};
const toggleActive2 = () => {
  active2.value = !active2.value;
};

const blurEvent = (e: FocusEvent) => {
  pConsole(e);
};

const toggleDisabled = () => {
  pConsole('hi');
  disabled.value = !disabled.value;
};

const toggleType = (e: any) => {
  type.value = type.value === 'default' ? 'primary' : 'default';
  pConsole(type.value);
  toggleDisabled();
};

const print = () => {
  pConsole('hello');
};

const checkbox = (e: any) => {
  pConsole(e.target);
};

const valueRef = ref('');
const labelRef = ref('极客江湖');


const printSubmit = (name:string)=>{console.log(name);return false;};


const data = ref([
  { id: 1, param: '立春' },
  { id: 2, param: '雨水' },
  { id: 3, param: '惊蛰' },
  { id: 4, param: '春分' },
  { id: 5, param: '清明' },
  { id: 6, param: '谷雨' },
  { id: 7, param: '立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至、小寒、大寒' },
]);
</script>

<template>


  <m-table v-if="isVUE" :data="data" height="200px">
    <m-table-column param="id" label="序号"/>
    <m-table-column param="param" label="参数"/>
    <m-table-column param="option" label="操作"/>
  </m-table>

</template>

<style scoped>

m-button {
  margin: 4px;
}

m-menu {
  width: 200px;
}

.m-divider-wrapper {
  width: 500px;
  height: 50px;
}

.border-inner {
  width: 200px;
  height: 200px;
  background-color: var(--m-color-main);
  color: white;
}

.test {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
}

.hello[show] {
  display: none;
}


.m-tai-chi {
  width: 100px;
  height: 100px;
}
</style>
