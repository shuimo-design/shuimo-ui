/**
 * @description
 * @author 阿怪
 * @date 2023/1/4 11:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { type LiProps, useLi } from '@shuimo-design/core';


@createMElement({
  name: 'm-li',
  hookFunc: useLi
})
export default class MLi extends MElement implements LiProps {
  active?: boolean;
}
