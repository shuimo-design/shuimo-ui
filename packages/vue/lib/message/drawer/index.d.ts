/**
 * @description drawer api type
 * @author 阿怪
 * @date 2022/4/16 23:32
 * @version v1.0.0
 *
 * @name m-drawer
 * @docDescription Drawer component with shuimo-ui style.
 *                 水墨组件的抽屉组件。
 * @docUrl https://shuimo.janghood.com/drawer
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DialogMask } from '../dialog';

export declare type DrawerProps = {
  /**
   * @description drawer width
   *              drawer的宽度
   * @type string
   * @default false
   */
  width?: string,
  /**
   * @description drawer mask option
   *              抽屉背景配置
   * @type DialogMask
   * @default show:true, clickClose:true
   */
  mask?: DialogMask,
  /**
   * @description drawer visible value
   *              抽屉是否显示参数
   * @type boolean
   * @default false
   */
  visible?: boolean,
  /**
   * @description drawer class
   *              抽屉扩展类型
   * @type string[]
   * @default []
   */
  drawerClass?: string[],
  /**
   * @description close button visible value
   *              是否显示关闭按钮
   * @type boolean
   * @default true
   */
  closeBtn?: boolean
}
