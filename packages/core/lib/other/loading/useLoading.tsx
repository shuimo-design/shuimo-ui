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
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { LoadingProps, LoadingRef } from './index';
import { unref } from '../../../composition/common/tools';

const style = await import('./loading.pcss');

const defaultSpeed = 2000;
export const loadingProps: MCOPO<LoadingProps> = {
  speed: { type: Number, default: defaultSpeed },
  mask: { type: Boolean, default: false },
  sideLength: { type: [Number, String], default: 50 }
};

const baseTimout = 100;
const shuaLength = 8;
const shuaIndexList = Array.from({ length: shuaLength }).map((_, index) => index);


const useRandomNum = (randomSpeed: number, activeFn: (shuaIndex: number) => void) => {

  const shuaList: number[] = [];
  let popList: number[] = Array.from(shuaIndexList);
  let timer;

  const pushRandomNum = () => {
    const randomNum = Math.floor(Math.random() * popList.length);
    shuaList.push(popList.splice(randomNum, 1)[0]);
    if (popList.length === 0) {
      popList = Array.from(shuaIndexList);
    }
    activeFn(shuaList.pop()!);
    timer = setTimeout(pushRandomNum, randomSpeed * Math.random() + baseTimout);
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
    ref.style.setProperty(ROTATE_VAR_NAME, `rotate(${0.1 * Math.random()}turn)`);
    setTimeout(() => {
      ref.classList.remove(showClassName);
      ref.style.removeProperty(ROTATE_VAR_NAME);
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

  const getTemplate = (options?: { props: LoadingProps, ref: LoadingRef }) => {
    const { props, ref } = useDefaultOptions(options!, { props: loadingProps });
    const animationSpeed = props.speed / 1000;

    const shuaList = shuaIndexList.map((_, i) => {
      return <div class={`m-loading-item m-loading-shua${i % 4}`} ref={ref[`shua${i}Ref`]}/>;
    });

    return <div class="m-loading" style={{ '--m-loading-speed': `${animationSpeed}s` }} ref={ref.loadingRef}>
      <div class="m-loading-shua-wrapper">
        {shuaList}
      </div>
    </div> as MNodeTemplate;
  };

  return {
    options: {
      props: loadingProps,
      style
    },
    getTemplate,
    onMountedHook
  };
}
