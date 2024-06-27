/**
 * @description 进度条组件
 * @author 阿怪
 * @date 2022/1/21 6:13 下午
 * @version v2.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 reconstruct the progress component. The original bamboo progress bar component will be moved to shuimo pro.
 * v2.0.1 showInfo set default value to true
 */
import { computed, defineComponent } from 'vue';
import { props } from './api.ts';
import './progress.css';
import { ProgressProps } from './index';
import MBorder from '../../template/border/MBorder.tsx';

const clearZero = (num: number) => {
  const str = num.toString();
  const index = str.indexOf('.');
  if (index === -1) {return num;}
  return str.slice(0, index + 3);
};

export default defineComponent((_props: ProgressProps, { slots }) => {
  const props = _props as Required<ProgressProps>;
  const per = computed(() => clearZero((props.value * 100 / props.max)));


  return () => {
    const info = slots.default?.() ?
      <div class="m-progress-info">
        {slots.default?.()}
      </div> : props.showInfo ? <span class="m-progress-per">{`${per.value}%`}</span> : null;

    return <div class="m-progress">
      <MBorder class="m-progress-border" instead-main={true}>
        <progress class="m-progress-main" value={props.value} max={props.max}/>
      </MBorder>
      {info}
    </div>;
  };
}, {
  name: 'MProgress',
  props,
});
