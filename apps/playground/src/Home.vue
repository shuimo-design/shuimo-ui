<template>
  <sp-rice-paper>
    <div class="playground">
      <div id="container">
        <div class="radios">
          <!--          <sp-button @click="send">send</sp-button>-->
          <sp-radio label="web-component" v-model="templateType.value"/>
          <sp-radio label="vue" v-model="templateType.value"/>
          <sp-radio label="react" v-model="templateType.value"/>
        </div>
        <div class="windows">
          <Editor v-model="templateHTML.value" language="html"/>
          <Editor v-model="templateCss.value" language="css"/>
          <Editor v-model="templateScript.value" language="javascript"/>
        </div>
      </div>
      <iframe class="viewer" src="/view" frameborder="0"/>
    </div>
  </sp-rice-paper>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/3/30 17:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { initWebComponent } from '@shuimo-design/web-component/index';
import useHome from './compositions/editor/useHome';
import Editor from './components/Editor.vue';

initWebComponent('sp');
const {
  templateType, templateHTML, templateCss, templateScript,
} = useHome();


</script>

<style lang="scss" scoped>

</style>
