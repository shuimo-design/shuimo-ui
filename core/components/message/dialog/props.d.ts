/**
 * @description dialog props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { MTeleportProps } from '../../../types/common/common.d.ts';
import type { ModelMask } from '../../../types/common/model.d.ts';

export declare type DialogProps = {
  /**
   * @description dialog visible value
   *              弹窗是否显示
   * @type boolean
   * @default false
   */
  visible?: boolean;
  /**
   * @description dialog mask option
   *              弹窗遮罩配置
   * @type ModelMask
   * @default { show: true, clickClose: true }
   */
  mask?: ModelMask;
  /**
   * @description close button visible
   *              是否显示关闭按钮
   * @type boolean
   * @default true
   */
  closeBtn?: boolean;
  /**
   * @description dialog teleport
   *              弹窗传送目标
   * @type MTeleportProps
   * @default { to: 'body' }
   */
  teleport?: MTeleportProps;
};
