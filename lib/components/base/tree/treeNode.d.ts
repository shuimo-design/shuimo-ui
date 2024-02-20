/**
 * @description tree node api type
 * @author 阿怪
 * @date 2023/6/25 14:31
 * @version v1.0.0
 *
 * @name m-tree-node
 * @docDescription Tree node component with shuimo-ui style.
 *                 水墨组件的树节点组件。
 * @docUrl https://shuimo.design/tree#node
 *
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TreeConfig, TreeNodeData } from './index';


export declare type TreeNodeProps = {
  /**
   * @description tree data
   *              树数据
   * @type TreeNodeData
   * @default []
   */
  data?: TreeNodeData[];
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
   * @description get nodes by keys function
   *             通过key获取节点方法
   * @type (keys: TreeNodeData['key'][]) => TreeNodeData[]
   */
  getNodesByKeys: (keys: TreeNodeData['key'][]) => TreeNodeData[];
  /**
   * @description handle expand function
   *              处理展开节点的方法
   * @type (node: TreeNodeData, e: MouseEvent) => void
   */
  handleExpand: (node: TreeNodeData, e: MouseEvent) => void;
  /**
   * @description handle check function
   *              处理选择节点的方法
   * @type (node: TreeNodeData, check: boolean) => void
   */
  handleCheck: (node: TreeNodeData, check: boolean) => void;
  /**
   * @description handle item click function
   *              处理item被点击的方法
   * @type (node: TreeNodeData, e: MouseEvent) => void
   */
  handleItemClick: (node: TreeNodeData, e: MouseEvent) => void;
};
