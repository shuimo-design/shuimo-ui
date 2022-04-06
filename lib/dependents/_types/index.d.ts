/**
 * @Description: 公共类型
 * @Author: 阿怪
 * @Date: 2022/4/5 9:44 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { ComponentPropsOptions, ComponentPublicInstance } from "vue";

/**
 * props和ctx类型接口
 */
export declare interface IComponentOption<Props> {
  props: ComponentPropsOptions<Props>;
  ctx: ComponentPublicInstance<Props>;
}
