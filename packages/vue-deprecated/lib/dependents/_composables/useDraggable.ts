/**
 * @description  拖拽函数
 * @author RSS1102
 * @date 2022/10/9 22:30
 * @version v0.0.1
 */
import { Ref, ref } from 'vue';
import type { MessageDirectionType } from '../../../types/components/MMessage';
interface Position {
  x: number,
  y: number
}

type Target = Ref<HTMLElement | null>;
/**
 * 拖拽hook
 * @param {HTMLElement} target 控制的元素
 * @param { 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'}  direction 元素的放置位置
 * @param {number} triggerBoundary 拖拽边界(默认为2,作为盒子的百分比分母)
 * @param {(target: Target) => void} triggerFn 拖拽触发成功回调
 * @param {(target: Target) => void} triggeredFn 拖拽触发成功完成后的回调
 */
export const useDraggable = (
  target: Target,
  direction: MessageDirectionType,
  triggerBoundary: number,
  triggerFn: (target: Target) => void,
  triggeredFn: (target: Target) => void
) => {
  /**
   * 鼠标初始按下位置[常量]
   */
  const initPosition = ref<Position>();

  /**
   * 鼠标移动点击的位置
   */
  const movePosition = ref<Position>();

  /**
   * target盒子的宽、高[常量]
   */
  const targetDesc = ref<Position>();

  /**
   * 移动的距离
   */
  const pressedDelta = ref<Position>();
  /**
   * 是否被拖拽
   */
  const isDrag = ref<boolean>(false);

  /**
   * 是否成功拖拽
   */
  const isSuccess = ref<boolean>(false);

  /**
   * 记录目标的style
   */
  let elStyle: string;
  if (target.value !== null) {
    elStyle = window.getComputedStyle(target.value).backgroundColor;
  }

  // 拖拽边界默认为2
  triggerBoundary = triggerBoundary ?? 2;

  /**
   * 成功拖拽触发的方法
   */
  const onSuccessd = () => {
    isSuccess.value = true;
    triggerFn(target);
  };
  /**
   * 未成功拖拽触发的方法
   */
  const unSuccessd = () => {
    isSuccess.value = false;
    target.value!.style.backgroundColor = elStyle;
    target.value!.style.opacity = '1';
    target.value!.style.filter = 'opacity(100%)';
  };
  /**
   * 监听鼠标按下时触发，记录鼠标按下时的初始变量
   */
  const start = (e: { target: any; preventDefault: () => void; clientX: number; clientY: number }) => {
    e.preventDefault();
    isDrag.value = true;
    initPosition.value = {
      x: e.clientX,
      y: e.clientY
    };
    targetDesc.value = {
      x: target.value!.clientWidth,
      y: target.value!.clientHeight
    };
  };
  /**
   * 鼠标移动触发的事件，在鼠标按下的之后触发主要方法
   */
  const move = (e: { target: any; preventDefault: () => void; clientX: number; clientY: number }) => {
    e.preventDefault();
    if (isDrag.value) {
      movePosition.value = {
        x: e.clientX,
        y: e.clientY
      };
      pressedDelta.value = {
        x: movePosition.value!.x - initPosition.value!.x,
        y: movePosition.value!.y - initPosition.value!.y
      };
      /**
       * 根据拖拽方向设置盒子的位置
       */
      switch (direction) {
        case 'bottom-right':
        case 'top-right':
        case 'top-center':
          target.value!.style.left = `${pressedDelta.value!.x}px`;
          //大于盒子宽度禁止拖拽
          pressedDelta.value!.x > targetDesc.value!.x ? (target.value!.style.left = `${targetDesc.value!.x}px`) : '';
          //小于边界禁止拖拽
          pressedDelta.value!.x < 0 ? (target.value!.style.left = `0px`) : '';
          //成功拖拽
          pressedDelta.value!.x > targetDesc.value!.x / triggerBoundary ? onSuccessd() : unSuccessd();
          break;
        case 'top-left':
        case 'bottom-left':
          target.value!.style.left = `${pressedDelta.value!.x}px`;
          pressedDelta.value!.x < -targetDesc.value!.x ? (target.value!.style.left = `-${targetDesc.value!.x}px`) : '';
          pressedDelta.value!.x > 0 ? (target.value!.style.left = `0px`) : '';
          pressedDelta.value!.x < -targetDesc.value!.x / triggerBoundary ? onSuccessd() : unSuccessd();
          break;
      }
    }
  };
  /**
   * 结束事件
   */
  const end = () => {
    isDrag.value = false;
    if (isSuccess.value) {
      target.value?.removeEventListener('mouseout', out);
      triggeredFn(target);
    } else {
      target.value!.style.left = `0px`;
      target.value!.style.top = `0px`;
    }
  };
  /**
   * 鼠标抬起事件
   */
  const up = () => {
    end();
  };
  /**
   * 鼠标离开元素事件
   */
  const out = () => {
    end();
  };
  target.value?.addEventListener('mousedown', start);
  target.value?.addEventListener('mousemove', move);
  target.value?.addEventListener('mouseup', up);
  target.value?.addEventListener('mouseout', out);
};
