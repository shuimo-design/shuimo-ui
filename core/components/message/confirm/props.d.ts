/**
 * @description confirm props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { ModelMask } from '../../../types/common/model.d.ts';
import type { MTeleportProps } from '../../../types/common/common.d.ts';

export declare type ConfirmProps = {
  /**
   * @description confirm mask option
   *              确认框背景配置
   * @type ModelMask
   * @default { show: true, clickClose: false }
   */
  mask?: ModelMask;
  /**
   * @description confirm teleport
   *              确认框传送目标
   * @type MTeleportProps
   * @default { to: 'body' }
   */
  teleport?: MTeleportProps;
  /**
   * @description confirm content
   *              确认框内容
   * @type string
   * @default ''
   */
  content?: string;
  /**
   * @description confirm button text
   *              确认按钮文字
   * @type string
   * @default '确定'
   */
  confirmText?: string;
  /**
   * @description cancel button text
   *              取消按钮文字
   * @type string
   * @default '取消'
   */
  cancelText?: string;
  /**
   * @description confirm dialog visible
   *              确认框是否显示（由 composable 内部管理）
   * @type boolean
   * @default false
   */
  visible?: boolean;
};
