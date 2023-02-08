<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref, computed } from 'vue';

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
const active2 = ref(true);
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

</script>

<template>
  <div class="hello">hi</div>
  <div class="hello">{{ active2 }}</div>
  <m-button :disabled="disabled" @click="print">hi</m-button>
  <m-button :type="type" @click="toggleType">hi</m-button>


  <m-checkbox v-if="isVUE" v-model="active2" @change="checkbox">开关</m-checkbox>
  <m-checkbox v-else :value="active2" @change="checkbox">开关</m-checkbox>

  <m-border>
    <div class="border-inner"></div>
  </m-border>
</template>

<style scoped>

m-button {
  margin: 4px;
}

m-menu {
  width: 200px;
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

</style>
