<template>
  <div>
    <h1>颜色</h1>
    <br/>
    <BaseTitle>文字</BaseTitle>
    <ColorPresenter color="text">瓦罐灰</ColorPresenter>
    <ColorPresenter color="text-disabled">嫩灰</ColorPresenter>
    <ColorPresenter color="text-dark">钢蓝</ColorPresenter>
    <BaseTitle>分割线</BaseTitle>
    <ColorPresenter color="divider">0.2钢蓝</ColorPresenter>
    <BaseTitle>边框</BaseTitle>
    <ColorPresenter color="border">鱼尾灰</ColorPresenter>
    <BaseTitle>按钮</BaseTitle>
    <ColorPresenter color="text">瓦罐灰</ColorPresenter>
    <BaseTitle>提醒</BaseTitle>
    <ColorPresenter color="warn">谷黄</ColorPresenter>
    <BaseTitle>正确</BaseTitle>
    <ColorPresenter color="success">美蝶绿</ColorPresenter>
    <BaseTitle>警告</BaseTitle>
    <ColorPresenter color="error">赭石</ColorPresenter>


  </div>
</template>

<script lang="ts" setup>
/**
 * @Description: 颜色
 * @Author: 阿怪
 * @Date: 2022/3/6 1:43 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import BaseTitle from '../../components/docs/BaseTitle.vue';
import ColorPresenter from '../../components/docs/ColorPresenter.vue';

definePageMeta({ alias: '/color' })

</script>

<style scoped>


</style>
