/**
 * @description radio api type
 * @author 阿怪
 * @date 2022/4/16 21:06
 * @version v1.0.0
 *
 * @name m-radio
 * @docDescription Radio component with shuimo-ui style.
 *                 水墨组件的单选组件。
 * @docUrl https://shuimo.janghood.com/radio
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type RadioProps = {
  /**
   * @description radio label
   *              单选框的标签值
   * @type string | number
   * @default ''
   */
  label?: string | number,
  /**
   * @description radio name
   *              单选框的name值
   * @type string | undefined
   * @default undefined
   */
  name?: string,
  /**
   * @description radio checked
   *              是否选中
   * @default undefined
   */
  checked?: boolean | undefined | null,
  /**
   * @description radio value
   *              单选框的值
   * @default undefined
   */
  value?: any,
  /**
   * @description value
   *              绑定值
   * @type any
   * @default ''
   */
  modelValue?: any,
}

export declare type RadioEvents = {
  onClick?: (e: MouseEvent, value?: string | number) => void
};
