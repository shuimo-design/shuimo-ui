/**
 * @description 进度条组件
 * @author 阿怪
 * @date 2022/1/21 6:13 下午
 * @version v1.0.3
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 修复width与预期不一致的问题，优化渲染逻辑
 * v1.0.2 修复绝对定位造成竹叶及数字渲染位置错误的问题
 * v1.0.3 百分比模块改为slot模式（为支持nuxt ssr ）
 */
import { computed, defineComponent } from 'vue';
import { leaf, useProgress } from './useProgress.ts';
import { props } from './api.ts';
import './progress.css';

export default defineComponent((props, { slots }) => {
  const { getProgressWrapperStyle, getProgressInfo } = useProgress({ props });
  const progressInfo = computed(() => getProgressInfo());
  const progressWrapperInfo = computed(() => {
    if (props.showInfo) {
      return getProgressWrapperStyle(progressInfo.value);
    }
    return undefined
  });


  return () => {

    const progress = <progress class="m-progress"
                               value={props.value} max={props.max} style={progressInfo.value.style}/>;
    if (!props.showInfo) {
      return progress;
    }


    return <div class="m-progress-border" style={progressWrapperInfo.value?.baseStyle}>
      <div class="m-progress-per" style={progressWrapperInfo.value?.textStyle}>
        <img class="m-progress-leaf" src={leaf} alt=""/>
        {slots.default?.()}
      </div>
      {progress}
    </div>;
  };
}, {
  name: 'MProgress',
  props
});
