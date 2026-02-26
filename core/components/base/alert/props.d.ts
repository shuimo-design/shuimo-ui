/**
 * @description alert api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * @name m-alert
 * @docDescription Alert component with shuimo-ui style.
 *                 水墨组件的警告提示组件。
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type AlertProps = {
  /**
   * @description 提示类型
   * @type 'success' | 'warning' | 'error' | 'info'
   * @default 'info'
   */
  type?: 'success' | 'warning' | 'error' | 'info';
  /**
   * @description 标题
   * @type string
   */
  title?: string;
  /**
   * @description 描述内容
   * @type string
   */
  description?: string;
  /**
   * @description 是否可关闭
   * @type boolean
   * @default false
   */
  closable?: boolean;
  /**
   * @description 是否显示图标
   * @type boolean
   * @default false
   */
  showIcon?: boolean;
};

export declare type AlertEvents = {
  /**
   * @description 关闭时触发
   */
  onClose?: () => void;
};
