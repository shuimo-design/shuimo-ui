/**
 * @description collapse api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type CollapseProps = {
  /**
   * @description 当前展开的面板名，手风琴模式为单值，普通模式为数组
   * @type (string | number)[] | string | number
   */
  modelValue: (string | number)[] | string | number;
  /**
   * @description 是否开启手风琴模式（同时只允许一个面板展开）
   * @type boolean
   * @default false
   */
  accordion?: boolean;
};

export declare type CollapseItemProps = {
  /**
   * @description 面板唯一标识
   * @type string | number
   */
  name: string | number;
  /**
   * @description 面板标题
   * @type string
   */
  title?: string;
  /**
   * @description 是否禁用该面板
   * @type boolean
   * @default false
   */
  disabled?: boolean;
};

export declare type CollapseEvents = {
  onChange?: (activeNames: (string | number)[]) => void;
};
