/**
 * @description headless slider 组件
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent } from 'vue';
import { SliderCore } from '@shuimo-design/ui-core';
import useSlider from '@shuimo-design/ui-core/components/base/slider/useSlider.ts';
import { SliderProps } from '@shuimo-design/ui-core/components/base/slider/props';
import './slider.css';

export default defineComponent((_props: SliderProps, ctx) => {
  const props = _props as Required<SliderProps>;

  const { sliderRef, btnRef, perRef } = useSlider(props, ctx);

  // 根据百分比计算已滑过的轨道宽度
  const runwayStyle = computed(() => {
    return {
      width: `${perRef.value * 100}%`,
    };
  });

  return () => {
    // 可选的信息展示区：显示最小值、当前百分比、最大值
    const getInfo = () => {
      return <div class="m-slider-info">
        <div class="m-slider-min">{props.min}</div>
        <div>{`${Number(perRef.value * 100).toFixed(2)}%`}</div>
        <div class="m-slider-max">{props.max}</div>
      </div>;
    };

    return <div class="m-slider">
      {props.showInfo ? getInfo() : undefined}
      <div class="m-slider-wrapper" ref={el => sliderRef.value = el as HTMLDivElement}>
        <div class="m-slider-runway" style={runwayStyle.value}/>
        <div class="m-slider-button" ref={el => btnRef.value = el as HTMLDivElement}></div>
      </div>
    </div>;
  };
}, {
  name: 'MSlider',
  props: SliderCore.props,
  emits: ['update:modelValue'],
});
