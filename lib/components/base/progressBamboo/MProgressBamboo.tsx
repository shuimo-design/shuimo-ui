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
 *
 * todo 优化css，单独设置宽度或者高度，能同比调整尺寸，用那个比例尺寸属性
 */
import { computed, defineComponent } from 'vue';
import { leaf, useProgressBamboo } from './useProgressBamboo.ts';
import { props } from './api.ts';
import './progressBamboo.css';
import { ProgressProps } from './index';

/**
 * @deprecated
 */
export default defineComponent((_props: ProgressProps, { slots }) => {
  const props = _props as Required<ProgressProps>;
  const { getProgressWrapperStyle, getProgressInfo } = useProgressBamboo({ props });
  const progressInfo = computed(() => getProgressInfo());
  const progressWrapperInfo = computed(() => {
    if (props.showInfo) {
      return getProgressWrapperStyle(progressInfo.value);
    }
    return undefined;
  });


  return () => {

    const progress = <progress class="m-progress-bamboo"
                               value={props.value} max={props.max} style={progressInfo.value.style}/>;
    if (!props.showInfo) {
      return progress;
    }


    return <div class="m-progress-bamboo-border" style={progressWrapperInfo.value?.baseStyle}>
      <div class="m-progress-bamboo-per" style={progressWrapperInfo.value?.textStyle}>
        <img class="m-progress-bamboo-leaf" src={leaf} alt=""/>
        {slots.default?.()}
      </div>
      {progress}
    </div>;
  };
}, {
  name: 'MProgress',
  props,
});
