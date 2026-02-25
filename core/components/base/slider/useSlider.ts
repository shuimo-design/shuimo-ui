/**
 * @description slider composable
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { onMounted, ref } from 'vue';
import { SliderProps } from './props';
import { useElementSize } from '../../../compositions/common/useElementSize.ts';
import useDrag, { DragOption, DragPosition, InteractEvent } from '../../../compositions/common/useDrag.ts';

export default function useSlider(props: Required<SliderProps>, ctx: any) {
  const sliderRef = ref<HTMLElement | null>(null);
  const sliderSize = useElementSize(sliderRef);

  const perRef = ref(0);

  const option: DragOption = { startAxis: 'x', lockAxis: 'x' };

  // 按钮宽度固定值，用于计算可拖拽区域
  const btnW = 20;

  const sub = props.max - props.min;

  // 处理拖拽移动，计算并约束位置，更新百分比
  const movePositionHandler = (event: InteractEvent, position: DragPosition) => {
    const totalW = sliderSize.w.value - btnW;

    let positionX = position.x + event.dx;
    if (positionX > totalW) {
      positionX = totalW;
    } else if (positionX < 0) {
      positionX = 0;
    }
    perRef.value = positionX / totalW;
    ctx.emit('update:modelValue', getValue());
    return { x: positionX > 0 ? positionX : 0, y: 0 };
  };

  // 根据当前百分比和 step 计算实际 value
  const getValue = () => {
    const addStep = Math.round(perRef.value * sub / props.step) * props.step;
    return props.min + addStep;
  };

  const { init: initDrag, domRef: btnRef } = useDrag({
    direction: 'top-right',
    event: {
      getOption: () => option,
      movePositionHandler,
    },
  });

  // 根据当前 modelValue 初始化按钮位置
  const init = () => {
    if (btnRef.value) {
      const { max, min, modelValue } = props;
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
    perRef,
  };
}
