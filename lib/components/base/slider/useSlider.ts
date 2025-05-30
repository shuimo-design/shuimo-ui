/**
 * @description core slider hook
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, onMounted, ref } from 'vue';
import { SliderProps } from './index';
import { useElementSize } from '../../../compositions/common/useElementSize.ts';
import { Options } from '../../../compositions/common/defineCore.ts';
import useDrag, { DragOption, DragPosition, InteractEvent } from '../../../compositions/common/useDrag.ts';
import { getDecimalPlaces, getStepValueFast } from '@shuimo-design/ui-core/compositions/utils/precision.ts';

export function useSlider(options: Options<{
  props: SliderProps,
  value: { perRef: number },
  event: {
    change: (value: number) => void,
    onChange: (value: number) => void
  }
}>) {
  const sliderRef = ref<HTMLElement | null>(null);
  const sliderSize = useElementSize(sliderRef);

  const perRef = ref(options.value.perRef);

  const option: DragOption = { startAxis: 'x', lockAxis: 'x' };

  // todo fix
  const btnW = 20;

  // 预先计算一些值，避免在高频调用中重复计算
  const sub = computed(() => options.props.max - options.props.min);
  const stepDecimals = computed(() => getDecimalPlaces(options.props.step));

  const movePositionHandler = (event: InteractEvent, position: DragPosition) => {
    const totalW = sliderSize.w.value - btnW;

    let positionX = position.x + event.dx;
    if (positionX > totalW) {
      positionX = totalW;
    } else if (positionX < 0) {
      positionX = 0;
    }
    perRef.value = positionX / totalW;
    options.event.change(getValue());
    return { x: positionX > 0 ? positionX : 0, y: 0 };
  };

  // 拖动结束处理函数
  const onDragEnd = () => {
    // 拖动结束时触发onChange回调
    options.event.onChange(getValue());
  };

  const getValue = () => {
    // 使用高性能版本的计算
    const currentValue = options.props.min + perRef.value * sub.value;

    // 使用预先计算好的stepDecimals，避免重复计算
    const result = getStepValueFast(
      currentValue,
      options.props.min,
      options.props.step,
      stepDecimals.value,
    );

    // 确保结果在范围内
    if (result < options.props.min) return options.props.min;
    if (result > options.props.max) return options.props.max;

    return result;
  };

  const { init: initDrag, domRef: btnRef } = useDrag({
    direction: 'top-right',
    event: {
      getOption: () => option,
      movePositionHandler,
      onDragLeave: onDragEnd, // 拖动结束时触发onChange
    },
  });

  const init = () => {
    if (btnRef.value) {
      const { max, min, modelValue } = options.props;
      // 简化计算，不需要过度精确（这里主要影响UI位置）
      const per = (modelValue - min) / (max - min);
      if (window && sliderRef.value) {
        const w = Number.parseFloat(window.getComputedStyle(sliderRef.value).width);

        const totalW = w - btnW;
        perRef.value = per;
        // 简化位置计算
        const x = per * totalW;
        btnRef.value.style.transform = `translate(${x}px, 0)`;

        initDrag({ x });
      }

    }
  };

  onMounted(() => {
    init();
  });

  return {
    btnRef,
    sliderRef,
  };
}
