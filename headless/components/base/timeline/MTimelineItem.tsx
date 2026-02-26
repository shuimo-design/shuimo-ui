/**
 * @description headless timeline-item 单项组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { TimelineCore } from '@shuimo-design/ui-core';
import { TimelineItemProps } from '@shuimo-design/ui-core/components/base/timeline/props';

const { timelineItemProps } = TimelineCore;

export default defineComponent((props: TimelineItemProps, { slots }) => {
  return () => {
    const type = props.type ?? 'primary';
    const size = props.size ?? 'normal';

    const timestampEl = props.timestamp && !props.hideTimestamp
      ? <div class="m-timeline-timestamp">{props.timestamp}</div>
      : null;

    return (
      <div class="m-timeline-item">
        {/* 时间戳上置 */}
        {props.placement === 'top' && timestampEl}

        {/* 左侧轨道区域：连接线 + 节点圆点 */}
        <div class="m-timeline-track">
          <div class={{
            'm-timeline-node': true,
            [`m-timeline-node-${type}`]: true,
            [`m-timeline-node-${size}`]: true,
            'm-timeline-node-hollow': !!props.hollow,
          }} />
          <div class="m-timeline-tail" />
        </div>

        {/* 右侧内容区域 */}
        <div class="m-timeline-right">
          <div class="m-timeline-content">{slots.default?.()}</div>
          {/* 时间戳下置（默认） */}
          {props.placement !== 'top' && timestampEl}
        </div>
      </div>
    );
  };
}, {
  name: 'MTimelineItem',
  props: timelineItemProps,
});
