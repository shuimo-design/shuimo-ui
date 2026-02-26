/**
 * @description headless timeline 容器组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { TimelineCore } from '@shuimo-design/ui-core';
import { TimelineProps } from '@shuimo-design/ui-core/components/base/timeline/props';
import './timeline.css';

const { timelineProps } = TimelineCore;

export default defineComponent((props: TimelineProps, { slots }) => {
  return () => {
    const vnodes = slots.default?.() ?? [];
    // reverse=true 时倒序渲染子节点
    const children = props.reverse ? [...vnodes].reverse() : vnodes;

    return <div class="m-timeline">{children}</div>;
  };
}, {
  name: 'MTimeline',
  props: timelineProps,
});
