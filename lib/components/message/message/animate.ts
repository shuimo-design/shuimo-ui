/**
 * @description message动画
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v2.0.0
 */
import { MessageDirectionType } from './index';


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
  const keyframes = getFadeInKeyframes(direction, { h: offsetHeight, w: offsetWidth });
  dom.animate(keyframes, OPTION);
};

const fadeOut = (dom: HTMLElement | null, direction: MessageDirectionType, onFinish: () => void) => {
  if (!dom) return;

  let translate = { x: 0, y: 0 };
  if (dom.style.transform) {
    translate.x = Number(dom.style.transform.split('(')[1].split('px')[0]);
    translate.y = Number(dom.style.transform.split(',')[1].split('px')[0]);
  }

  const offsetHeight = dom.offsetHeight || 0;
  const offsetWidth = dom.offsetWidth || 0;

  const keyframes = getFadeOutKeyframes(direction, { h: offsetHeight, w: offsetWidth }, translate);
  const animate = dom.animate(keyframes, OPTION);
  if (animate) {
    animate.onfinish = () => {
      onFinish();
    };
  } else {
    onFinish();
  }
};

const getFadeInKeyframes = (direction: string, offset: { h: number, w: number }) => {
  let arr: Array<AnimateKeyframe> = [];
  if (!directionArr.includes(direction)) return null;
  if (direction === 'top-right') {
    arr = [
      { opacity: 0, transform: `translateX(${offset.w}px)` },
      { opacity: 1, transform: `translateX(0)` }
    ];
  }
  if (direction === 'bottom-right') {
    arr = [
      { opacity: 0, transform: `translateX(${offset.w}px)`, marginBottom: `-${offset.h}px` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'top-left') {
    arr = [
      { opacity: 0, transform: `translateX(-${offset.w}px)` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'bottom-left') {
    arr = [
      { opacity: 0, transform: `translateX(-${offset.w}px)`, marginBottom: `-${offset.h}px` },
      { opacity: 1, transform: `translateX(0px)` }
    ];
  }
  if (direction === 'top-center') {
    arr = [
      { opacity: 0, marginTop: `-${offset.h}px`, transform: 'scale(0.8)' },
      { opacity: 1, transform: `translateY(0px)` }
    ];
  }
  return arr;
};

const getFadeOutKeyframes = (direction: string, offset: { h: number, w: number }, translate: {
  x: number,
  y: number
}): Array<Keyframe> | null => {
  let arr: Array<AnimateKeyframe> = [];
  if (!directionArr.includes(direction)) return null;
  if (direction === 'top-right') {
    arr = [
      { opacity: 1, transform: `translateX(${translate.x}px)` },
      { opacity: 0, transform: `translateX(${offset.w}px)`, marginBottom: `-${offset.h}px` }
    ];
  }
  if (direction === 'bottom-right') {
    arr = [
      { opacity: 1, transform: `translateX(${translate.x}px)` },
      { opacity: 0, transform: `translateX(${offset.w}px)` }
    ];
  }
  if (direction === 'top-left') {
    arr = [
      { opacity: 1, transform: `translateX(${translate.x}px)` },
      { opacity: 0, transform: `translateX(-${offset.w}px)`, marginBottom: `-${offset.h}px` }
    ];
  }
  if (direction === 'bottom-left') {
    arr = [
      { opacity: 1, transform: `translateX(${translate.x}px)` },
      { opacity: 0, transform: `translateX(-${offset.w}px)` }
    ];
  }
  if (direction === 'top-center') {
    arr = [
      { opacity: 1, transform: `translateY(${translate.y}px)` },
      { opacity: 0, marginTop: `-${offset.h}px`, transform: 'scale(0.8)' }
    ];
  }
  return arr;
};

export { fadeIn, fadeOut };
