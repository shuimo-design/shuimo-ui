/**
 * @description drawer api type
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * @name m-drawer
 * @docDescription Headless drawer component.
 *                 无样式抽屉组件。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { ModelMask } from '../../../types/common/model.d.ts';
import type { MTeleportProps } from '../../../types/common/common.d.ts';

export declare type DrawerProps = {
  /**
   * @description drawer visible value
   *              抽屉是否显示
   * @type boolean
   * @default false
   */
  visible?: boolean,
  /**
   * @description drawer mask option
   *              抽屉背景配置
   * @type ModelMask
   * @default { show: true, clickClose: true }
   */
  mask?: ModelMask,
  /**
   * @description drawer class
   *              抽屉扩展类名
   * @type string[]
   * @default []
   */
  drawerClass?: string[],
  /**
   * @description drawer direction
   *              抽屉出现方向
   * @type 'top' | 'right' | 'bottom' | 'left'
   * @default 'right'
   */
  direction?: 'top' | 'right' | 'bottom' | 'left',
  /**
   * @description drawer teleport
   *              抽屉传送配置
   * @type MTeleportProps
   * @default { to: 'body' }
   */
  teleport?: MTeleportProps
};
