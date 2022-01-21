/**
 * @Description: 竹子进度条
 * @Author: 菩萨蛮
 * @Date: 2022/1/21 6:13 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from "vue";
import { isEmpty, notEmpty } from "../../dependents/_utils/tools";
import leaf from '../../assets/progress/leaf.png';

const BASE_WIDTH = 556;
const BASE_HEIGHT = 37;
const W2H = BASE_WIDTH / BASE_HEIGHT;

const getSize = (w?: number, h?: number) => {
  let size = {
    width: w || BASE_WIDTH,
    height: h || BASE_HEIGHT
  }
  if (isEmpty(h) && notEmpty(w)) {
    return { width: w!, height: w! / W2H }
  }
  if (notEmpty(h) && isEmpty(w)) {
    return { width: h! * W2H, height: h! }
  }
  return size;
};
const getTextSize = (width: number, infoWidth: number, per: number) => {
  return (width - infoWidth / 2) * per / 100 * 2;
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
    style: { type: Object }
  },
  render(ctx: any) {
    const { width, height } = getSize(ctx.width, ctx.height);
    const style = {
      '--w-progress-width': `${width}px`,
      '--w-progress-height': `${height}px`
    }
    // @ts-ignore
    const progress = (<progress className='w-progress' value={ctx.value} max={ctx.max} style={style}/>);
    if (!ctx.showInfo) {
      return progress;
    }

    const per = Math.ceil(ctx.value / ctx.max * 100);
    const textStyle = {
      '--w-progress-per-height': `${height}px`,
      '--w-progress-per-widht': `${width}px`,
      left: `${getTextSize(width, ctx.infoWidth, per)}px`
    }

    return (
      <div class='w-progress-border' style={ctx.style}>
        <div class='w-progress-per' style={textStyle}>
          <span>{per}%</span>
          <img class='leaf' src={leaf} alt=""/>
        </div>
        {progress}
      </div>
    )
  }
});
