/**
 * @description dropdown api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type DropdownProps = {
  /**
   * @description 触发方式
   * @type 'click' | 'hover'
   * @default 'click'
   */
  trigger?: 'click' | 'hover';
  /**
   * @description 弹出位置
   * @type string
   * @default 'bottom'
   */
  placement?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end';
  /**
   * @description 是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean;
};

export declare type DropdownItemProps = {
  /**
   * @description 选项文本
   * @type string
   */
  label?: string;
  /**
   * @description 是否禁用该选项
   * @type boolean
   * @default false
   */
  disabled?: boolean;
  /**
   * @description 是否在此项上方显示分割线
   * @type boolean
   * @default false
   */
  divided?: boolean;
  /**
   * @description 点击触发的指令值
   * @type string | number
   */
  command?: string | number;
};
