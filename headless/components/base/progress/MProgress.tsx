/**
 * @description headless progress
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { ProgressCore } from '@shuimo-design/ui-core';
import { ProgressProps } from '@shuimo-design/ui-core/components/base/progress/props';
import useProgress from '@shuimo-design/ui-core/components/base/progress/useProgress';
import './progress.css';

const { props } = ProgressCore;

export default defineComponent((_props: ProgressProps, { slots }) => {
  const props = _props as Required<ProgressProps>;
  const { percentage } = useProgress(props);

  return () => {
    const info = slots.default?.()
      ? <div class="m-progress-info">{slots.default?.()}</div>
      : props.showInfo
        ? <span class="m-progress-per">{`${percentage.value}%`}</span>
        : null;

    return <div class="m-progress">
      <progress class="m-progress-main" value={props.value} max={props.max}/>
      {info}
    </div>;
  };
}, {
  name: 'MProgress',
  props,
});
