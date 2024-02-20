/**
 * @description core slider hook
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { onMounted, ref } from 'vue';
import { SliderProps } from './index';
import { useElementSize } from '../../../compositions/common/useElementSize.ts';
import { Options } from '../../../compositions/common/defineCore.ts';
import useDrag, { DragOption, DragPosition, InteractEvent } from '../../../compositions/common/useDrag.ts';

export function useSlider(options: Options<{
  props: SliderProps,
  value: { perRef: number },
  event: {
    change: (value: number) => void
  }
}>) {
  const sliderRef = ref<HTMLElement | null>(null);
  const sliderSize = useElementSize(sliderRef);

  const perRef = ref(options.value.perRef);

  const option: DragOption = { startAxis: 'x', lockAxis: 'x' };

  // todo fix
  const btnW = 20;

  const sub = options.props.max - options.props.min;
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


  const getValue = () => {
    const addStep = Math.round(perRef.value * sub / options.props.step) * options.props.step;
    return options.props.min + addStep;
  };


  const { init: initDrag, domRef: btnRef } = useDrag({
    direction: 'top-right',
    event: {
      getOption: () => option,
      movePositionHandler,
    },
  });

  const init = () => {
    if (btnRef.value) {
      const { max, min, modelValue } = options.props;
      const per = (modelValue - min) / (max - min);
      if (window && sliderRef.value) {
        const w = Number.parseFloat(window.getComputedStyle(sliderRef.value).width);

        const totalW = w - btnW;
        perRef.value = per;
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
