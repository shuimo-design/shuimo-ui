/**
 * @description menu api type
 * @author 阿怪
 * @date 2022/4/17 00:55
 * @version v1.0.0
 *
 * @name m-menu
 * @docDescription menu component with shuimo-ui style.
 *                 水墨组件的目录组件。
 * @docUrl https://shuimo.janghood.com/menu
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiProps } from '../../base/list/li/li';

export type MenuType = {
  title: string,
  key: any,
  isActive: boolean,
  index?: number[],
  children?: MenuTypeArr
}
export type MenuTypeArr = Array<MenuType>;


export declare type MenuProps = {
  /**
   * @description menu array
   * @type MenuType[]
   * @default []
   */
  menu?: MenuTypeArr,
  /**
   * @description menu inline
   * @type boolean
   * @default false
   */
  inline?: boolean
}

export declare type MenuItemProps = LiProps;
