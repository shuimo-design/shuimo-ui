/**
 * @description web component version border
 * @author 阿怪
 * @date 2023/6/14 18:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineCustomElement } from 'vue';
import { MBorderSetup } from './MBorder';
import style from './border.css?inline';

export default defineCustomElement({
  name: 'MWCBorder',
  setup: MBorderSetup(<slot></slot> as unknown as HTMLSlotElement),
  styles: [style],
});
