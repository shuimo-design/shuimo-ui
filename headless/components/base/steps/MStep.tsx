/**
 * @description headless Step 单个步骤组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   <div class="m-step m-step-{status}">
 *     <div class="m-step-icon">[index + 1 或自定义 icon]</div>
 *     <div class="m-step-content">
 *       <div class="m-step-title">{title}</div>
 *       <div class="m-step-description">{description}</div>
 *     </div>
 *     <div class="m-step-tail" />  // 连接线，最后一步不渲染
 *   </div>
 *
 * 注意：index 由父级 MSteps 通过 slot vnode 顺序隐式推断，
 * 此处通过 `index` prop 显式接收（由主题层包装时传入）。
 */
import { defineComponent } from 'vue';
import { StepsCore } from '@shuimo-design/ui-core';
import { StepProps } from '@shuimo-design/ui-core/components/base/steps/props';

const { stepProps, useStep } = StepsCore;

/** 扩展 stepProps 增加 index 用于父级编排 */
const stepWithIndexProps = {
  ...stepProps,
  /** 步骤序号（从 0 开始），由父级负责传入 */
  index: { type: Number, default: 0 },
};

export default defineComponent((props: StepProps & { index: number }, ctx) => {
  const { stepClass, isLast } = useStep(props.index, props.status);
  const { slots } = ctx;

  return () => (
    <div class={stepClass.value}>
      {/* 图标区域 */}
      <div class="m-step-icon">
        {slots.icon
          ? slots.icon()
          : props.icon
            ? <span class="m-step-icon-custom">{props.icon}</span>
            : <span class="m-step-icon-number">{props.index + 1}</span>
        }
      </div>

      {/* 内容区域 */}
      <div class="m-step-content">
        <div class="m-step-title">
          {slots.title ? slots.title() : props.title}
        </div>
        {(props.description || slots.description) && (
          <div class="m-step-description">
            {slots.description ? slots.description() : props.description}
          </div>
        )}
      </div>

      {/* 连接尾线，最后一步不渲染 */}
      {!isLast.value && <div class="m-step-tail" />}
    </div>
  );
}, {
  name: 'MStep',
  props: stepWithIndexProps,
});
