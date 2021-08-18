<template>
  <w-md-editor v-model:content="article" :readOnly="readOnly"></w-md-editor>
  <w-button text="保存" @click="handleSaveArticle"></w-button>
</template>

<script lang="ts">
/*
 * @Author: 望海潮
 * @Date: 2021-08-18 09:39:10
 * @LastEditTime: 2021-08-18 10:13:50
 * @Description: markdown组件
 */
import demo from '../../md/demo.md';

export default {
  name: 'MdEditorDemo',
  data() {
    return {
      article: demo,
      // 只读属性
      readOnly: false
    }
  },
  methods: {
    handleSaveArticle() {
      console.log(this.article);
    }
  }
}
</script>

<style>

</style>
