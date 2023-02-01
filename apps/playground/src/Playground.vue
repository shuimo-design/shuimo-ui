<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

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
  console.log(e);
};

const toggleDisabled = () => {
  console.log('hi');
  disabled.value = !disabled.value;
};

const toggleType = (e: any) => {
  // console.log(e);
  type.value = type.value === 'default' ? 'primary' : 'default';
  toggleDisabled();
};

</script>

<template>

  <m-popover>
    <m-button>点击显示popover</m-button>
    <div class="border-inner" slot="content">
      <div class="test">测试</div>
    </div>
  </m-popover>


  <div class="hello" show="true">hi</div>

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

.hello[show]{
  display: none;
}

</style>
