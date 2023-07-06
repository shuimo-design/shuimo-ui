/**
 * @description vue version slider
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v0.0.0-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/slider/api';
import { useSlider } from '@shuimo-design/core/lib/base/slider/useSlider';

export default defineComponent({
  name: 'MSlider',
  props: {
    ...props,
    modelValue: props.value
  },
  emit: ['update:modelValue'],
  setup: (props, { slots, emit }) => {

    const btnRef = ref();
    const perRef = ref(0);

    const runwayStyle = computed(() => {
      return {
        width: `${perRef.value * 100}%`
      };
    });

    watch(() => props.value, () => {
      perRef.value = props.value;
    });

    const { onMountedEvent, sliderRef } = useSlider({
      props,
      value: { btnRef, perRef },
      event: {
        change: value => {
          emit('update:modelValue', value);
        }
      }
    }, ref);

    onMounted(() => {
      onMountedEvent();
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
          <div class="m-slider-button" ref={el => btnRef.value = el}></div>
        </div>
      </div>;
    };
  }
});
