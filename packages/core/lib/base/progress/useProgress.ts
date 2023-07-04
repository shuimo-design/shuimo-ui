/**
 * @description progress hook
 * @author 阿怪
 * @date 2023/4/23 01:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { isEmpty, notEmpty } from '@shuimo-design/tools/empty';
import { ProgressProps } from './index';
import leafPng from './assets/leaf.webp'
import { Options } from '../../../composition/common/defineCore';

export const BASE_SIZE = {
  BG: { W: 556, H: 37 },
  LEAF: { W: 95, H: 109 }
};

const W2H = BASE_SIZE.BG.W / BASE_SIZE.BG.H;
const LEAF_W2H = BASE_SIZE.LEAF.W / BASE_SIZE.LEAF.H;

const getSize = (w?: number, h?: number, w2h = W2H) => {
  const size = {
    width: w || BASE_SIZE.BG.W,
    height: h || BASE_SIZE.BG.H
  };
  if (isEmpty(h) && notEmpty(w)) {
    return { width: w!, height: w! / w2h };
  }
  if (notEmpty(h) && isEmpty(w)) {
    return { width: h! * w2h, height: h! };
  }
  return size;
};

const getTextLeft = (width: number, infoWidth: number, leafWidth: number, per: number) => {
  return ((width - leafWidth) * per) / 100 - infoWidth / 2;
};



export const leaf = leafPng;


export function useProgress(options: Options<{
  props: ProgressProps,
}>){
  const { props } = options;
  const getProgressInfo = () => {
    const { width, height } = getSize(props.width, props.height);

    return {
      style: {
        '--m-progress-real-width': `${width}px`,
        '--m-progress-real-height': `${height}px`
      },
      width
    };
  };

  const getProgressWrapperStyle = ( progressInfo: ReturnType<typeof getProgressInfo>) => {
    const { width, style } = progressInfo;
    const leafSize = getSize(undefined, props.leafHeight, LEAF_W2H);
    const per = Math.ceil((props.value / props.max) * 100);
    const perWidth = leafSize.width + props.infoWidth;
    const textStyle = {
      left: `${getTextLeft(width, props.infoWidth, leafSize.width, per)}px`
    };

    const baseStyle = {
      ...style,
      '--m-progress-per-height': `${leafSize.height}px`,
      '--m-progress-per-width': `${perWidth}px`,
      '--m-progress-leaf-height': `${props.leafHeight}px`
    };

    return {
      textStyle,baseStyle
    }
  };

  return {
    getProgressInfo,
    getProgressWrapperStyle
  }

}
