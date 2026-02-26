/**
 * @description headless Steps 容器组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   <div class="m-steps m-steps-{direction}">
 *     [slot: 多个 MStep]
 *   </div>
 *
 * 通过 provide 将 active/direction/finishStatus/processStatus 下发给子 MStep
 */
import { defineComponent } from 'vue';
import { StepsCore } from '@shuimo-design/ui-core';
import { StepsProps } from '@shuimo-design/ui-core/components/base/steps/props';
import './steps.css';

const { stepsProps, useSteps } = StepsCore;

export default defineComponent((props: StepsProps, ctx) => {
  const { stepsClass, context } = useSteps(props);
  const { slots } = ctx;

  return () => {
    // 统计子步骤数量，便于 MStep 判断是否为最后一步
    const children = slots.default ? slots.default() : [];
    context.total = children.length;

    return (
      <div class={stepsClass.value}>
        {children}
      </div>
    );
  };
}, {
  name: 'MSteps',
  props: stepsProps,
});
