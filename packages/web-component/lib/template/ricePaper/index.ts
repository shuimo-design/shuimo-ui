/**
 * @description rice-paper component
 * @author 阿怪
 * @date 2022/12/17 13:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MVNode, useRicePaper } from '@shuimo-design/core';
import { customElement } from '../../../module';
import { RicePaperProps } from '@shuimo-design/core/lib/template/ricePaper';
import ShuimoElement from '../../../module/elements/ShuimoElement';

const { template, props, style } = useRicePaper();

@customElement({
  name: 'm-rice-paper',
  style,
  template,
  props
})
export default class MRicePaper extends ShuimoElement implements RicePaperProps {

  public cold: boolean = true;
  public mountain: boolean = true;
  public crane: boolean = true;

  constructor() {
    super();
  }

  beforeRender() {
    if (this.VNode.template && this.VNode.template.children) {
      this.VNode.template.children.mountain.if = this.mountain;
      this.VNode.template.children.crane.if = this.crane;
    }
  }
}
