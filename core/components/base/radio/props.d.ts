/**
 * @description radio props type
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * @name m-radio
 * @docDescription Radio component.
 *                 单选组件。
 * @docUrl https://shuimo.design/radio
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
  value?: string | number,
  /**
   * @description value
   *              绑定值
   * @type string | number | boolean
   * @default ''
   */
  modelValue?: string | number | boolean,
};

export declare type RadioEvents = {
  onClick?: (e: MouseEvent, value?: string | number) => void
};
