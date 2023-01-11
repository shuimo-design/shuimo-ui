/**
 * @description rice-paper component
 * @author 阿怪
 * @date 2022/12/17 13:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useRicePaper, type RicePaperProps } from '@shuimo-design/core';
import { createMElement, MElement } from 'moelement';

const { template, props, style } = useRicePaper();

@createMElement({
  name: 'm-rice-paper',
  style,
  template,
  props
})
export default class MRicePaper extends MElement implements RicePaperProps {

  public cold: boolean = true;
  public mountain: boolean = true;
  public crane: boolean = true;

  constructor() {
    super();
  }

  beforeRender() {
    if (this.template.children) {
      this.template.children.mountain.if = this.mountain;
      this.template.children.crane.if = this.crane;
    }
  }
}
