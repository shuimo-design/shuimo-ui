/**
 * @description steps core 导出
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { stepsProps, stepProps } from './api';
import { useSteps, useStep, stepsContextKey, resolveStepStatus } from './useSteps';

export const StepsCore = {
  stepsProps,
  stepProps,
  useSteps,
  useStep,
  stepsContextKey,
  resolveStepStatus,
};

export type { StepsProps, StepProps, StepItem, StepStatus, StepsDirection } from './props';
export type { StepsContext } from './useSteps';
