/**
 * @description collapse api type
 * @author 阿怪
 * @date 2025/02/17 20:52
 * @version v1.0.0
 *
 * @name m-collapse
 * @docDescription Collapse component with shuimo-ui style.
 *              水墨组件的折叠组件。
 * @docUrl https://shuimo.design/collapse
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type CollapseProps = {
  /**
   * @description collapse modelValue. 折叠展开状态
   * @type boolean
   * @default false
   */
  modelValue?: boolean;
  /**
   * @description collapse disabled. 是否禁用
   * @type boolean
   * @default false
   */
  disabled?: boolean;
  /**
   * @description collapse renderContext. 是否渲染上下文
   * @type boolean
   * @default false
   */
  renderContext?: boolean;
  /**
   * @description collapse line. 是否显示分割线
   * @type boolean
   * @default true
   */
  line?: boolean;
};
