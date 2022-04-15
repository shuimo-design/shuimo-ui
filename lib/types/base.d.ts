/**
 * @description 基础类型
 * @author 阿怪
 * @date 2022/4/14 09:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
