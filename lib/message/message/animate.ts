/**
 * @description message动画
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v2.0.0
 */

import type { MessageDirectionType } from '../../../types/components/MMessage';

interface AnimateKeyframe {
  composite?: 'accumulate' | 'add' | 'auto' | 'replace',
  easing?: string,
  offset?: number | null,
  [property: string]: string | number | null | undefined
}

const OPTION = {
  duration: 300,
  easing: 'linear'
};

const directionArr = ['top-right', 'bottom-right', 'top-left', 'bottom-left', 'top-center'];

const fadeIn = (dom: HTMLElement | null, direction: string) => {
  if (!dom) return;
  const offsetHeight = dom.offsetHeight || 0;
  const offsetWidth = dom.offsetWidth || 0;
  const keyframes = getFadeInKeyframes(direction, offsetHeight, offsetWidth);
  dom.animate(keyframes, OPTION);
};

const fadeOut = (dom: HTMLElement | null, direction: MessageDirectionType, onFinish: () => void) => {
  if (!dom) return;
  const offsetHeight = dom.offsetHeight || 0;
  const offsetWidth = dom.offsetWidth || 0;

  const keyframes = getFadeOutKeyframes(direction, offsetWidth, offsetHeight);
  const animate = dom.animate(keyframes, OPTION);
  if (animate) {
    animate.onfinish = () => {
      onFinish();
    };
  } else {
    onFinish();
  }
};

const getFadeInKeyframes = (direction: string, offsetHeight: number, offsetWidth: number) => {
  let arr: Array<AnimateKeyframe> = [];
  if (!directionArr.includes(direction)) return null;
  if (direction === 'top-right') {
    arr = [
      { opacity: 0, transform: `translateX(${offsetWidth}px)` },
      { opacity: 1, transform: `translateX(0)` }
    ];
  }
  if (direction === 'bottom-right') {
    arr = [
      { opacity: 0, transform: `translateX(${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'top-left') {
    arr = [
      { opacity: 0, transform: `translateX(-${offsetWidth}px)` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'bottom-left') {
    arr = [
      { opacity: 0, transform: `translateX(-${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'top-center') {
    arr = [
      { opacity: 0, marginTop: `-${offsetHeight}px`, transform: 'scale(0.8)' },
      { opacity: 1, transform: `translateY(0px)` }
    ];
  }
  return arr;
};

const getFadeOutKeyframes = (direction: string, offsetWidth: Number, offsetHeight: Number): Array<Keyframe> | null => {
  let arr: Array<AnimateKeyframe> = [];
  if (!directionArr.includes(direction)) return null;
  if (direction === 'top-right') {
    arr = [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` }
    ];
  }
  if (direction === 'bottom-right') {
    arr = [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(${offsetWidth}px)` }
    ];
  }
  if (direction === 'top-left') {
    arr = [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(-${offsetWidth}px)`, marginBottom: `-${offsetHeight}px` }
    ];
  }
  if (direction === 'bottom-left') {
    arr = [
      { opacity: 1, transform: `translateX(0px)` },
      { opacity: 0, transform: `translateX(-${offsetWidth}px)` }
    ];
  }
  if (direction === 'top-center') {
    arr = [
      { opacity: 1, transform: `translateY(0px)` },
      { opacity: 0, marginBottom: `-${offsetHeight}px`, transform: 'scale(0.8)' }
    ];
  }
  return arr;
};

export { fadeIn, fadeOut };
