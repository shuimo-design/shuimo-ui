/**
 * @Description: markdown模块
 * @Author: 阿怪
 * @Date: 2022/3/4 11:01 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * todo 这里应该可以优化成直接使用 vite-plugin-md
 */
import { defineNuxtModule, addVitePlugin } from '@nuxt/kit';
import Vue from '@vitejs/plugin-vue'
import { VitePluginMarkdown } from '../dependence/markdownLib';


export default defineNuxtModule(() => {
  addVitePlugin(Vue({ include: [/\.md/], exclude: [/\.vue$/] }));
  addVitePlugin(VitePluginMarkdown());
});
