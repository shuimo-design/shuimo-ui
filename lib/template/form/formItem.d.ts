/**
 * @description form item api type
 * @author 阿怪
 * @date 2022/4/5 9:43 AM
 * @version v1.0.0
 *
 * @name w-form-item
 * @docDescription FormItem component with wash-painting-ui style.
 *                  水墨组件的表单item组件。
 * @docUrl https://wash-painting.com/form#item
 * @sourceSymbol WFormItem
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { IComponentOption } from "../../dependents/_types";

export declare type FormItemProps = {
  /**
   * @description form item label
   *              表单项的标题
   * @type string
   */
  label: string,
  /**
   * @description form item label prop
   *              表单内置label的原生prop属性
   * @type string
   */
  prop: string
}

export declare type OptionType = IComponentOption<FormItemProps>;
