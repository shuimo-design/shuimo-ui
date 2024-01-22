/**
 * @description core loading hook
 * @author 阿怪
 * @date 2023/03/05 01:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * "shua" is an onomatopoeia, just like the sound of a knife cutting through something.
 */
import { LoadingProps, LoadingRef } from './index';
import { defaultSpeed } from './api';
import { unref } from 'vue';

const baseTimout = 1000;
const shuaLength = 4;
const shuaIndexList = Array.from({ length: shuaLength }).map((_, index) => index);

const useRandomNum = (randomSpeed: number, activeFn: (shuaIndex: number) => void) => {

  const shuaList: number[] = [];
  let popList: number[] = Array.from(shuaIndexList);
  let timer;

  const pushRandomNum = () => {
    // todo fix: why use random will cause the animation to be stuck
    // const randomNum = Math.floor(Math.random() * popList.length);
    const randomNum = 0;
    shuaList.push(popList.splice(randomNum, 1)[0]);
    if (popList.length === 0) {
      popList = Array.from(shuaIndexList);
    }
    activeFn(shuaList.pop()!);
    // const ms = randomSpeed * Math.random() / 3 + randomSpeed * 0.7;
    const ms = randomSpeed * 0.7;
    timer = setTimeout(pushRandomNum, ms);
  };


  return {
    shuaList,
    pushRandomNum
  };
};

const showClassName = 'm-loading-item-show';
const ROTATE_VAR_NAME = '--m-loading-show-rotate';

export function useLoading() {


  const animationHook = (refValue: any, speed: number) => {
    const ref = unref(refValue);
    if (!ref || !ref.classList) return;
    ref.classList.add(showClassName);
    setTimeout(() => {
      ref.classList.remove(showClassName);
    }, speed);
  };

  const onMountedHook = (options: LoadingProps & LoadingRef) => {
    const speed = options.speed ?? defaultSpeed;
    const randomSpeed = speed / shuaLength + baseTimout;
    const { pushRandomNum } = useRandomNum(randomSpeed, shuaIndex => {
      animationHook(options[`shua${shuaIndex}Ref` as keyof LoadingRef], speed);
    });
    pushRandomNum();
  };

  const getStyle = (props: Pick<LoadingProps, 'speed' | 'sideLength'>) => {
    const animationSpeed = (props.speed ?? 1500) / 1000;
    const isNumber = !isNaN(Number(props.sideLength));
    const fixedSideLength = isNumber ? `${props.sideLength}px` : props.sideLength;
    return { '--m-loading-speed': `${animationSpeed}s`, height: fixedSideLength, width: fixedSideLength };
  };


  return {
    shuaIndexList,
    onMountedHook,
    getStyle
  };
}
