/**
 * @description web component version rice-paper
 * @author 阿怪
 * @date 2023/6/14 23:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineCustomElement } from 'vue';
import { MRicePaperSetup } from './MRicePaper.tsx';
import { props } from './api.ts';
import styles from './assets/ricePaperShadow.css?inline';

export default defineCustomElement({
  name: 'MWCRicePaper',
  props,
  setup: MRicePaperSetup(<slot></slot> as unknown as HTMLSlotElement),
  styles: [styles],
});
