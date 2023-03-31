/**
 * @description
 * @author 阿怪
 * @date 2023/3/24 01:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// import vueWorker from 'monaco-volar/vue.worker?worker';

const loadMonacoEnv = () => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      // if (label === 'vue') {
      //   return new vueWorker();
      // }
      return new editorWorker();
    }
  };
};

const getDom = (id: string) => {
  return document.getElementById(id)!;
};

monaco.editor.setTheme('vs-dark');
loadMonacoEnv();

export default function useMonaco() {


  const createMonaco = (data: {
    value: string,
    dom: HTMLElement,
    language: string,
    event?:{
      onDidBlurEditorText?: (value: string) => void
    }
  })=>{
    const { value, dom, language } = data;

    const m = monaco.editor.create(dom, {
      value,
      language
    });

    m.onDidBlurEditorText((e) => {
      data.event?.onDidBlurEditorText?.(m.getValue());
    });


    return {
      monaco: m
    }
  }

  return {
    createMonaco

  };


}
