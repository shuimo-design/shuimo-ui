/**
 * @description 虚拟列表 props 类型定义
 * @author 阿怪
 * @date 2026/2/25 13:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type VirtualListProps<T = any> = {
  /**
   * @description 列表数据
   */
  list?: Array<T>;
  /**
   * @description 预估行高，用于初始计算可见数量，避免依赖首次全量渲染
   * @default 40
   */
  estimatedHeight?: number;
  /**
   * @description 过扫描系数，渲染可视区域外的额外行数倍数
   * @default 1
   */
  overScan?: number;
};
