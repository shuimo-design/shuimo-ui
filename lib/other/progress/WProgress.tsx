/**
 * @Description: 竹子进度条
 * @Author: 菩萨蛮
 * @Date: 2022/1/21 6:13 下午
 * @Version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 修复width与预期不一致的问题，优化渲染逻辑
 */
import { defineComponent } from "vue";
import { isEmpty, notEmpty } from "../../dependents/_utils/tools";
import leaf from '../../assets/progress/leaf.png';

const BASE_SIZE = {
  BG: { W: 556, H: 37 },
  LEAF: { W: 95, H: 109 },
}

const W2H = BASE_SIZE.BG.W / BASE_SIZE.BG.H;
const LEAF_W2H = BASE_SIZE.LEAF.W / BASE_SIZE.LEAF.H;

const getSize = (w?: number, h?: number, w2h = W2H) => {
  let size = {
    width: w || BASE_SIZE.BG.W,
    height: h || BASE_SIZE.BG.H
  }
  if (isEmpty(h) && notEmpty(w)) {
    return { width: w!, height: w! / w2h }
  }
  if (notEmpty(h) && isEmpty(w)) {
    return { width: h! * w2h, height: h! }
  }
  return size;
};
const getTextLeft = (width: number, perWidth: number, per: number) => {
  return (width - perWidth / 2) * per / 100;
}

export default defineComponent({
  name: 'WProgress',
  props: {
    width: { type: Number },
    height: { type: Number },
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    showInfo: { type: Boolean, default: false },
    infoWidth: { type: Number, default: 44 },
    leafHeight: { type: Number, default: 28 }
  },
  render(ctx: any) {
    const { showInfo, leafHeight } = ctx;
    const { width, height } = getSize(ctx.width, ctx.height);
    const style: Object = {
      '--w-progress-width': `${width}px`,
      '--w-progress-height': `${height}px`
    }
    const progress = (<progress class='w-progress' value={ctx.value} max={ctx.max} style={style}/>);
    if (!showInfo) {
      return progress;
    }
    // 如果是有info的情况
    const leafSize = getSize(undefined, leafHeight, LEAF_W2H);

    const { infoWidth } = ctx;

    const per = Math.ceil(ctx.value / ctx.max * 100);
    const perWidth = leafSize.width + infoWidth;
    const textStyle = {
      '--w-progress-per-height': `${leafSize.height}px`,
      '--w-progress-per-width': `${perWidth}px`,
      left: `${getTextLeft(width, perWidth, per)}px`
    }

    const baseStyle: Object = {
      '--w-progress-leaf-height': `${leafHeight}px`
    }

    return (
      <div class={['w-progress-border', showInfo ? 'show-info' : '']} style={baseStyle}>
        <div class='w-progress-per' style={textStyle}>
          <img class='leaf' src={leaf} alt=""/>
          <span>{per}%</span>
        </div>
        {progress}
      </div>
    )
  }
});
