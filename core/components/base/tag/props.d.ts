/**
 * @description tag props type
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * @name m-tag
 * @docDescription Tag component.
 *                 标签组件。
 * @docUrl https://shuimo.design/tag
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TagProps = {
  /**
   * @description tag type
   *              标签类型
   * @type string
   * @default default
   * @enum default|primary|error|confirm|warning
   */
  type?: 'default' | 'primary' | 'error' | 'confirm' | 'warning'
};
