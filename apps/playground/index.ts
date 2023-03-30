/**
 * @description
 * @author 阿怪
 * @date 2023/3/24 01:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import useEditor from './editor/useEditor';
import templateHTML from './template/template.html?raw';
import templateCss from './template/template.css?raw';
import templateScript from './template/template.js?raw';
import useVueRender from './render/useVueRender';
import { initWebComponent } from '@shuimo-design/web-component/index';


// for editor


const template = { templateHTML, templateCss, templateScript };
useEditor(template);


// default use vueRender

initWebComponent('sp');
useVueRender(template);
