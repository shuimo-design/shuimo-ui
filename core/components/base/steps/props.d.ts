/**
 * @description steps 组件 props 类型定义
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * 步骤状态类型
 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/**
 * 步骤条方向
 */
export type StepsDirection = 'horizontal' | 'vertical';

/**
 * 单个步骤数据（用于数据驱动模式）
 */
export declare type StepItem = {
  /**
   * @description 步骤标题
   */
  title: string;
  /**
   * @description 步骤描述
   */
  description?: string;
  /**
   * @description 自定义图标
   */
  icon?: string;
  /**
   * @description 强制指定步骤状态，不指定时由 active 自动推算
   */
  status?: StepStatus;
};

/**
 * Steps 容器组件 props
 */
export declare type StepsProps = {
  /**
   * @description 当前激活步骤（从 0 开始）
   * @default 0
   */
  active?: number;
  /**
   * @description 步骤条方向
   * @default 'horizontal'
   */
  direction?: StepsDirection;
  /**
   * @description 已完成步骤的状态
   * @default 'finish'
   */
  finishStatus?: 'success' | 'finish';
  /**
   * @description 当前步骤的状态
   * @default 'process'
   */
  processStatus?: 'process' | 'finish';
};

/**
 * Step 单个步骤组件 props
 */
export declare type StepProps = {
  /**
   * @description 步骤标题
   */
  title: string;
  /**
   * @description 步骤描述
   */
  description?: string;
  /**
   * @description 自定义图标
   */
  icon?: string;
  /**
   * @description 强制指定步骤状态，不指定时由父级 Steps 推算
   */
  status?: StepStatus;
};
