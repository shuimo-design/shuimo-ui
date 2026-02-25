/**
 * @description popover 类型定义
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * @name m-popover
 * @docDescription Popover component.
 *                 弹出框组件。
 * @docUrl https://shuimo.design/popover
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Placement, PopperConfig } from '../../../compositions/popper/usePopper.ts';
import { MTeleportProps } from '../../../types/common/common';


export type PopoverProps = {
  /**
   * @description 弹出框位置
   * @type Placement
   * @default bottom
   */
  placement?: Placement,
  /**
   * @description 挂载时是否渲染弹出内容
   * @type boolean
   * @default false
   */
  mountRender?: boolean,
  /**
   * @description 禁用点击外部自动关闭
   * @type boolean
   * @default false
   */
  disableClickAway?: boolean,
  /**
   * @description 简单文本内容可通过 prop 传入
   * @type any
   * @default ''
   */
  content?: any,
  /**
   * @description 是否通过 hover 触发
   * @type boolean
   * @default false
   */
  hover?: boolean,
  /**
   * @description 是否显示
   * @type boolean
   * @default false
   */
  show?: boolean,
  /**
   * @description floating-ui 配置项，参考 https://floating-ui.com/
   * @type PopperConfig
   * @default {}
   */
  popper?: PopperConfig,
  /**
   * @description 传送门配置
   * @type MTeleportProps | boolean
   * @default undefined
   */
  teleport?: MTeleportProps | undefined | boolean
};
