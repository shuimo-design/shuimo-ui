/**
 * @description
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * @name m-menu
 * @docDescription menu component with shuimo-ui style.
 * @docUrl https://shuimo.janghood.com/menu,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TreeConfig, TreeData } from '../../base/tree';

export declare type MenuProps = {
  /**
   * @description tree data
   *              树数据
   * @type TreeData
   * @default []
   */
  data?: TreeData | TreeData[];
  /**
   * @description tree config
   *              树配置
   * @type TreeConfig
   * @default { key:'key', label:'label', value:'value', children: 'children' }
   */
  config?: TreeConfig;
  /**
   * @description checkbox 是否使用checkbox
   *              树数据
   * @type TreeData
   * @default []
   */
  checkbox?: boolean;
  /**
   * @description default expand all nodes
   *              是否默认打开所有节点
   * @type boolean
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * @description checked keys
   *              选中key列表
   * @type Array<string|number>
   * @default []
   */
  checkedKeys?: Array<string | number>;
  /**
   * @description the selected status of the parent and child nodes is no longer associated,
   *              and can be selected or canceled separately
   *              父子节点选中状态不再关联，可各自选中或取消
   * @type boolean
   * @default true
   */
  checkStrictly?: boolean;
};
