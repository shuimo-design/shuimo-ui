/**
 * @description datePicker api type
 * @author 阿怪
 * @date 2022/4/16 20:51
 * @version v1.0.0
 *
 * @name m-date-picker
 * @docDescription DatePicker component with shuimo-ui style.
 *                 水墨组件的日期选择组件。
 * @docUrl https://shuimo.janghood.com/date-picker
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DatePickerProps = {
  /**
   * @description date value
   *              日期值
   * @default ''
   */
  modelValue?: string | Date,
  /**
   * @description date placeholder
   *              日期选择框提示文字
   * @default 请选择日期
   */
  placeholder?: string,
  /**
   * @description datePicker format type date/month
   *              日期选择框类型 date/month
   * @default date
   * @enum date|month
   */
  type?: string
}
