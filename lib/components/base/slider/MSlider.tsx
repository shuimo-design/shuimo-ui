/**
 * @description vue version slider
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v0.0.0-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo support mouse scroll and click slider to change value
 */
import { computed, defineComponent, ref } from 'vue';
import { props } from './api.ts';
import { SliderProps } from './index';
import { useSlider } from './useSlider.ts';
import './slider.css';

export default defineComponent((props: SliderProps, { emit }) => {


  const perRef = ref(0);

  const runwayStyle = computed(() => {
    return {
      width: `${perRef.value * 100}%`
    };
  });

  // watch(() => props.value, () => {
  //   perRef.value = props.value;
  // });

  const { sliderRef, btnRef } = useSlider({
    props: props as Required<SliderProps>,
    value: { perRef },
    event: {
      change: value => {
        emit('update:modelValue', value);
      }
    }
  });


  return () => {

    const getInfo = () => {
      return <div class="m-slier-info">
        <div class="m-slider-min">{props.min}</div>
        <div>{`${Number(perRef.value * 100).toFixed(2)}%`}</div>
        <div class="m-slider-max">{props.max}</div>
      </div>;
    };

    return <div class="m-slider">
      {props.showInfo ? getInfo() : undefined}
      <div class="m-slider-wrapper" ref={el => sliderRef.value = el as HTMLDivElement}>
        <div class="m-slider-runway" style={runwayStyle.value}/>
        <div class="m-slider-button" ref={el => btnRef.value = el  as HTMLDivElement}></div>
      </div>
    </div>;
  };
}, {
  name: 'MSlider',
  props,
  emits: ['update:modelValue']
});
