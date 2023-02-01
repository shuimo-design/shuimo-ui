/**
 * @description web-component TaiChi template
 * @author 阿怪
 * @date 2023/1/31 11:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { createMElement, MElement } from 'moelement';
import { useTaiChi } from '@shuimo-design/core';
import { MInitProps } from 'moelement/types/template';
import { TaiChiProps } from '@shuimo-design/core/lib/other/TaiChi';

@createMElement({
  name: 'm-tai-chi',
  hookFunc: useTaiChi
})
export default class MTaiChi extends MElement implements TaiChiProps {
  public modelValue: boolean = false;
  public value: boolean = false;

  constructor() {super();}

  initTemplate(props: MTaiChi, initProps: MInitProps<MTaiChi>) {
    super.initTemplate(props, initProps);
    initProps(props, {
      onClick: (e: MouseEvent) => {
        this.value = !this.value;
        // this.modelValue = !this.modelValue;
      }
    });
  }

}
