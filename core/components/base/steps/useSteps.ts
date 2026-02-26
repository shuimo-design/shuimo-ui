/**
 * @description steps composable
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, InjectionKey, provide, inject } from 'vue';
import { StepsProps, StepStatus } from './props';

/**
 * Steps 向子 Step 注入的上下文结构
 */
export interface StepsContext {
  /** 当前激活步骤索引 */
  active: number;
  /** 已完成步骤状态 */
  finishStatus: 'success' | 'finish';
  /** 当前步骤状态 */
  processStatus: 'process' | 'finish';
  /** 步骤总数（由子步骤注册后更新） */
  total: number;
  /** 方向 */
  direction: 'horizontal' | 'vertical';
}

/** 注入键 */
export const stepsContextKey: InjectionKey<StepsContext> = Symbol('stepsContext');

/**
 * Steps 容器 composable
 * 负责将当前激活状态通过 provide 下发给 MStep 子组件
 */
export function useSteps(props: StepsProps) {
  const context: StepsContext = {
    get active() { return props.active ?? 0; },
    get finishStatus() { return props.finishStatus ?? 'finish'; },
    get processStatus() { return props.processStatus ?? 'process'; },
    get direction() { return props.direction ?? 'horizontal'; },
    total: 0,
  };

  provide(stepsContextKey, context);

  /** 容器 class 列表 */
  const stepsClass = computed(() => [
    'm-steps',
    `m-steps-${props.direction ?? 'horizontal'}`,
  ]);

  return { stepsClass, context };
}

/**
 * 根据步骤索引和父级上下文推算当前步骤状态
 * @param index 当前步骤序号（从 0 开始）
 * @param overrideStatus 显式指定的状态，优先级最高
 * @param ctx 父级 Steps 上下文
 */
export function resolveStepStatus(
  index: number,
  overrideStatus: StepStatus | undefined,
  ctx: StepsContext,
): StepStatus {
  // 显式指定时直接使用
  if (overrideStatus) return overrideStatus;

  const active = ctx.active;
  if (index < active) return ctx.finishStatus as StepStatus;
  if (index === active) return ctx.processStatus as StepStatus;
  return 'wait';
}

/**
 * Step 单个步骤 composable
 * 从父级注入 StepsContext，计算当前步骤的状态与样式类
 */
export function useStep(index: number, overrideStatus?: StepStatus) {
  const ctx = inject(stepsContextKey, null);

  const status = computed<StepStatus>(() => {
    if (!ctx) {
      // 未嵌套在 Steps 中时默认为 wait
      return overrideStatus ?? 'wait';
    }
    return resolveStepStatus(index, overrideStatus, ctx);
  });

  const stepClass = computed(() => [
    'm-step',
    `m-step-${status.value}`,
  ]);

  const isLast = computed(() => {
    if (!ctx) return true;
    return index >= ctx.total - 1;
  });

  return { status, stepClass, isLast, ctx };
}
