/**
 * @description core progress hook
 * @author 阿怪
 * @date 2023/03/09 16:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo support show-info value name
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { ProgressProps } from './index';
import { isEmpty, notEmpty } from '../../../composition/common/tools';

const style = await import('./progress.pcss');
// @ts-ignore todo fix this
const leaf = await import('./assets/leaf.png');
export const progressProps: MCOPO<ProgressProps> = {
  width: { type: Number, default: 399 },
  height: { type: Number, default: 26.547 },
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  showInfo: { type: Boolean, default: false },
  infoWidth: { type: Number, default: 44 },
  leafHeight: { type: Number, default: 28 }
};


const BASE_SIZE = {
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

export function useProgress() {

  const getTemplate = (options?: { props: ProgressProps }) => {
    const { props } = useDefaultOptions(options!, { props: progressProps });
    const { width, height } = getSize(props.width, props.height);

    const style = {
      '--m-progress-real-width': `${width}px`,
      '--m-progress-real-height': `${height}px`
    };

    const progress = <progress class="m-progress"
                               value={props.value} max={props.max} style={style}/> as MNodeTemplate;
    if (!props.showInfo) {
      return progress;
    }

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


    return <div class="m-progress-border" style={baseStyle}>
      <div class="m-progress-per" style={textStyle}>
        <img class="m-progress-leaf" src={leaf.default} alt=""/>
        <slot/>
      </div>
      {progress}
    </div> as MNodeTemplate;
  };

  return {
    options: {
      props: progressProps,
      style
    },
    getTemplate
  };
}
