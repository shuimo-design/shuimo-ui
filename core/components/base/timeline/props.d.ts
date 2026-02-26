/**
 * @description timeline api type
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export declare type TimelineProps = {
  /**
   * @description 是否倒序排列
   * @type boolean
   * @default false
   */
  reverse?: boolean,
};

export declare type TimelineItemProps = {
  /**
   * @description 时间戳文本
   * @type string
   */
  timestamp?: string,
  /**
   * @description 是否隐藏时间戳
   * @type boolean
   * @default false
   */
  hideTimestamp?: boolean,
  /**
   * @description 时间戳相对内容的位置
   * @type 'top' | 'bottom'
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom',
  /**
   * @description 节点类型，影响圆点颜色
   * @type 'primary' | 'success' | 'warning' | 'error' | 'info'
   * @default 'primary'
   */
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info',
  /**
   * @description 节点尺寸
   * @type 'normal' | 'large'
   * @default 'normal'
   */
  size?: 'normal' | 'large',
  /**
   * @description 自定义图标（图标名或内容，由消费层解释）
   * @type string
   */
  icon?: string,
  /**
   * @description 是否为空心圆点
   * @type boolean
   * @default false
   */
  hollow?: boolean,
};
