/**
 * @description 宣纸背景组件
 * @author 阿怪
 * @date 2022/7/14 23:22
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 默认改为冷色调，添加色调选项
 */
import { defineComponent } from 'vue';
import { props } from './api';
import { MRicePaperSetup } from './RicePaperSetup.tsx';
import './ricePaper.css';


export default defineComponent(MRicePaperSetup(), {
  name: 'MRicePaper',
  props,
});
