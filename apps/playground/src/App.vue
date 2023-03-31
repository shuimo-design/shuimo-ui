<template>
  <sp-rice-paper>
    <div class="playground">
      <div id="container">
        <div class="radios">
          <sp-radio label="web-component"></sp-radio>
          <sp-radio label="vue"></sp-radio>
          <sp-radio label="react"></sp-radio>
        </div>
        <div class="windows">

          <Editor v-model="templateHTML" language="html"/>
          <Editor v-model="templateCss" language="css"/>
          <Editor v-model="templateScript" language="javascript"/>

        </div>
        <!--    <div id="vue"></div>-->
      </div>
      <iframe class="viewer"></iframe>
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
import tHTML from './template/template.html?raw';
import tCss from './template/template.css?raw';
import tScript from './template/template.js?raw';
// import useEditor from './compositions/editor/useEditor';
import { initWebComponent } from '@shuimo-design/web-component/index';
import Editor from './components/Editor.vue';
import { onMounted, ref, watch } from 'vue';
import useVueRender from './compositions/render/useVueRender';

initWebComponent('sp');
// useEditor(template);

const templateHTML = ref(tHTML);
const templateCss = ref(tCss);
const templateScript = ref(tScript);


const { update,init } = useVueRender();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
  init({
    templateHTML: templateHTML.value,
    templateCss: templateCss.value,
    templateScript: templateScript.value
  });
});

watch([templateHTML, templateCss, templateScript], () => {
  if(isMounted.value){
    update({
      templateHTML: templateHTML.value,
      templateCss: templateCss.value,
      templateScript: templateScript.value
    });
  }
});


</script>

<style lang="scss" scoped>

</style>
