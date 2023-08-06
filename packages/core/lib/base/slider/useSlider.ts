/**
 * @description core slider hook
 * @author 阿怪
 * @date 2023/06/29 17:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SliderProps } from './index';
import { Options } from '../../../composition/common/defineCore';
import { MRef, RefInit, refWrapper } from '../../../composition/common/MRef';
import useDrag, { DragOption, DragPosition, InteractEvent } from '../../../composition/common/useDrag';
import useMessageDrag from '../../message/message/useMessageDrag';
import { useElementSize } from '../../../composition/common/useElementSize';

export function useSlider(options: Options<{
  props: SliderProps,
  value: {
    btnRef: HTMLElement | null,
    perRef: number
  },
  event: {
    change: (value: number) => void
  }
}>, refInit: RefInit) {
  const sliderRef = refWrapper<HTMLElement | null>(null, refInit);
  const sliderSize = useElementSize(refInit, sliderRef);

  const btnRef = MRef(options.value.btnRef);
  const perRef = MRef(options.value.perRef);

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


  const { init: initDrag } = useDrag({
    direction: 'top-right',
    value: {
      domRef: btnRef
    },
    event: {
      getOption: () => option,
      movePositionHandler
    }
  });

  const init = () => {
    if (btnRef.value) {
      const { max, min, value } = options.props;
      const per = (value-min) / (max - min);
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

  const onMountedEvent = () => {
    init();
  };


  return {
    onMountedEvent,
    sliderRef
  };

}
