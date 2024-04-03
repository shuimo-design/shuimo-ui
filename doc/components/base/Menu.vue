<template>
  <m-menu class="menu" :data="menuList" @node-click="clickMenu">
    <template #default="{data}">
      <span>{{$t(data)}}</span>
    </template>
  </m-menu>
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

const clearAllMenuList = (list: any) => {
  list.forEach((item: any) => {
    item.isActive = false;
    if (item.children && item.children.length > 0) {
      clearAllMenuList(item.children);
    }
  });
};

const router = useRouter();
const { locale } = useI18n();
type Menu = any; // todo fix this
const clickMenu = (info: Menu, event: { target: HTMLElement }) => {
  if (info.children && info.children.length > 0) {
    if (Array(...event.target.classList).includes('m-menu-item-child')) {
      return;
    }
  }
  const lang = locale.value === 'zh' ? '' : `/${locale.value}`;
  menuList.value.forEach((item: Menu) => {
    item.isActive = false;
    if (item.children && item.children.length > 0) {
      item.children.forEach((child: Menu, index: number) => {
        child.isActive = false;
        // active true logic
        if (item.label === info.label && item.route === info.route && index === 0) {
          item.isActive = true;
          if (item.route !== 'main') {
            child.isActive = true;
          }
        }
        if (child.label === info.label && child.route === info.route) {
          item.isActive = true;
          child.isActive = true;
        }
      });
    }
  });


  router.push(`${lang}/${info.route}`);

};

onBeforeMount(() => {

  const path = router.currentRoute.value.path.split('/')[1];

  if (path === '' || path === 'main') {
    clearAllMenuList(menuList.value);
    menuList.value[0].isActive = true;
    return;
  }
  menuList.value.forEach((item: Menu) => {
    item.isActive = false;
    if (item.children && item.children.length > 0) {
      item.children.forEach((child: Menu) => {
        child.isActive = false;

        if (child.route === path) {
          item.isActive = true;
          child.isActive = true;
        }
      });
    }
  });


});


</script>

<style scoped>
.menu {
  margin-left: 99px;
  height: 100%;
  width: 216px;
}

</style>
