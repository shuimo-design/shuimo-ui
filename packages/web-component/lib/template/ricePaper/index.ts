/**
 * @description rice-paper component
 * @author 阿怪
 * @date 2022/12/17 13:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { type RicePaperProps, useRicePaper } from '@shuimo-design/core';
import { createMElement, MElement } from '@shuimo-design/lit';


@createMElement({
  name: 'm-rice-paper',
  hookFunc: useRicePaper
})
export default class MRicePaper extends MElement implements RicePaperProps {

  cold: boolean = true;
  mountain: boolean = true;
  crane: boolean = true;


}
