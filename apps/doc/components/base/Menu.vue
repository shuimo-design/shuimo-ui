<template>
  <m-menu class="menu" :data="menuList" @node-click="clickMenu"/>
</template>

<script lang="ts" setup>
/**
 * @Description:
 * @Author: 阿怪
 * @Date: 2022/3/4 8:26 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
import { menu } from '@/config/menu.config';

const menuList = ref(menu);

const router = useRouter();

type Menu = any; // todo fix this
const clickMenu = (info: Menu) => {
  // if (index.length === 1) {
  //   m = menuList.value![index[0]];
  // } else {
  //   m = menuList.value![index[0]]!.children![index[1]];
  // }
  router.push(`/${info.route}`);
};


</script>

<style scoped>
.menu {
  margin-left: 99px;
  height: 100%;
  width: 216px;
}

</style>
