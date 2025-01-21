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
import { props } from '@shuimo-design/ui-core/components/template/border/api.ts';

export default defineCustomElement({
  name: 'MWCBorder',
  props,
  setup: MBorderSetup(<slot></slot> as unknown as HTMLSlotElement),
  styles: [style],
});
