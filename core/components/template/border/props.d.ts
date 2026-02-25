/**
 * @description border props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type BorderProps = {
  /**
   * @description 顶部边框是否显示
   * @default true
   * @type boolean | string
   */
  top?: boolean | string;
  /**
   * @description 右侧边框是否显示
   * @default true
   * @type boolean | string
   */
  right?: boolean | string;
  /**
   * @description 底部边框是否显示
   * @default true
   * @type boolean | string
   */
  bottom?: boolean | string;
  /**
   * @description 左侧边框是否显示
   * @default true
   * @type boolean | string
   */
  left?: boolean | string;
  /**
   * @description 是否用 slot 替换主容器 div
   * @default false
   * @type boolean | string
   */
  insteadMain?: boolean | string;
};
