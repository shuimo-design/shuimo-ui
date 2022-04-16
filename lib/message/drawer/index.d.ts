/**
 * @description drawer api type
 * @author 阿怪
 * @date 2022/4/16 23:32
 * @version v1.0.0
 *
 * @name w-drawer
 * @docDescription Drawer component with wash-painting-ui style.
 *                 水墨组件的侧拉框组件。
 * @docUrl https://wash-painting.com/drawer
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DialogMask } from "../dialog";

export declare type DrawerProps = {
  /**
   * @description drawer width
   *              drawer的宽度
   * @type string
   * @default false
   */
  width?: string,
  /**
   * @description dialog mask option
   *              弹窗背景配置
   * @type DialogMask
   * @default show:true, clickClose:true
   */
  mask?: DialogMask,
  /**
   * @description dialog visible value
   *              弹窗是否显示参数
   * @type boolean
   * @default false
   */
  visible?: boolean,
  /**
   * @description dialog class
   *              弹窗扩展类型
   * @type string[]
   * @default []
   */
  drawerClass?: string[],
}
