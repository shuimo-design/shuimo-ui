/**
 * @description steps runtime props 定义
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../types/props';
import { StepsProps, StepProps, StepsDirection, StepStatus } from './props';

/**
 * Steps 容器组件运行时 props
 */
export const stepsProps: MCOPO<StepsProps> = {
  active: { type: Number, default: 0 },
  direction: { type: String as MPropType<StepsDirection>, default: 'horizontal' },
  finishStatus: { type: String as MPropType<'success' | 'finish'>, default: 'finish' },
  processStatus: { type: String as MPropType<'process' | 'finish'>, default: 'process' },
};

/**
 * Step 单个步骤组件运行时 props
 */
export const stepProps: MCOPO<StepProps> = {
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  status: { type: String as MPropType<StepStatus>, default: undefined },
};
