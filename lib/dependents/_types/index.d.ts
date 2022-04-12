/**
 * @description 公共类型
 * @author 阿怪
 * @date 2022/4/5 9:44 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import type { ComponentPublicInstance } from "vue";
import type { Prop } from '@vue/runtime-core';

type PropOptions<T> = {
  [P in keyof T]: Prop<T[P]>;
}
/**
 * props和ctx类型接口
 */
export declare interface IComponentOption<Props> {
  props: PropOptions<Props>;
  ctx: ComponentPublicInstance<Props>;
}
