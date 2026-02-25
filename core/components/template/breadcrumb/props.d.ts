/**
 * @description breadcrumb props 类型定义
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 面包屑单项数据结构
 */
export declare type BreadcrumbItemOption = {
  /**
   * @description 显示文本
   * @type string
   */
  label: string;
  /**
   * @description 跳转链接，有值时渲染为 <a> 标签
   * @type string
   */
  href?: string;
  /**
   * @description 是否禁用
   * @default false
   * @type boolean
   */
  disabled?: boolean;
};

export declare type BreadcrumbProps = {
  /**
   * @description 分隔符
   * @default '/'
   * @type string
   */
  separator?: string;
  /**
   * @description 面包屑数据项列表
   * @default []
   * @type BreadcrumbItemOption[]
   */
  items?: BreadcrumbItemOption[];
};
