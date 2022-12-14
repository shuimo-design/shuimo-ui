/**
 * @description 进度条组件
 * @author 阿怪
 * @date 2022/1/21 6:13 下午
 * @version v1.0.3
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 修复width与预期不一致的问题，优化渲染逻辑
 * v1.0.2 修复绝对定位造成竹叶及数字渲染位置错误的问题
 * v1.0.3 百分比模块改为slot模式（为支持nuxt ssr ）
 */
import { computed, defineComponent, toRefs } from 'vue';
import { isEmpty, notEmpty } from '../../dependents/_utils/tools';
import leaf from '../../assets/progress/leaf.png';
import { props } from './api';

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

export default defineComponent({
  name: 'MProgress',
  props,
  setup(props, { slots }) {
    const { showInfo, leafHeight, value, max } = toRefs(props);

    const { width, height } = getSize(props.width, props.height);
    const style = computed(() => ({
      '--m-progress-width': `${width}px`,
      '--m-progress-height': `${height}px`
    }));

    return () => {
      const progress = <progress class="m-progress" value={value.value} max={max.value} style={style.value} />;
      if (!showInfo.value) {
        return progress;
      }
      // 如果是有info的情况

      const { infoWidth } = toRefs(props);
      const leafSize = getSize(undefined, leafHeight.value, LEAF_W2H);
      const per = Math.ceil((value.value / max.value) * 100);
      const perWidth = leafSize.width + infoWidth.value;
      const textStyle = {
        left: `${getTextLeft(width, infoWidth.value, leafSize.width, per)}px`
      };
      const baseStyle = {
        ...style.value,
        '--m-progress-per-height': `${leafSize.height}px`,
        '--m-progress-per-width': `${perWidth}px`,
        '--m-progress-leaf-height': `${leafHeight.value}px`
      };

      return (
        <div class={['m-progress-border']} style={baseStyle}>
          <div class="m-progress-per" style={textStyle}>
            <img class="leaf" src={leaf} alt="" />
            {slots.default ? slots.default() : null}
          </div>
          {progress}
        </div>
      );
    };
  }
});
