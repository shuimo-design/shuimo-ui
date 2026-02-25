/**
 * @description headless grid 网格布局组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   div.m-grid.m-grid-{direction}
 *     slot (默认插槽，子元素)
 */
import { defineComponent, CSSProperties } from 'vue';
import { GridCore } from '@shuimo-design/ui-core/components/template/grid';
import { GridProps } from '@shuimo-design/ui-core/components/template/grid/props';

const { props } = GridCore;
import './grid.css';

/**
 * 将数值或字符串转为 CSS 长度值
 * 数值自动追加 px 单位，字符串直接使用
 */
function toCSSLength(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export default defineComponent((_props: GridProps, _ctx: any) => {
  const { slots } = _ctx;

  return () => {
    const p = _props as Required<GridProps>;
    const style: CSSProperties = {};

    // 尺寸控制
    if (p.h !== undefined) {
      style.height = `${p.h}px`;
    }
    if (p.w !== undefined) {
      style.width = `${p.w}px`;
    }

    // 通用 gap：作为 CSS 变量的回退基准值
    if (p.gap !== undefined && p.gap !== 0) {
      (style as Record<string, string>)['--m-grid-gap'] = toCSSLength(p.gap);
    }

    // 列间距：优先级高于 gap
    if (p.colGap !== undefined) {
      (style as Record<string, string>)['--m-grid-col-gap'] = toCSSLength(p.colGap);
    }

    // 行间距：优先级高于 gap
    if (p.rowGap !== undefined) {
      (style as Record<string, string>)['--m-grid-row-gap'] = toCSSLength(p.rowGap);
    }

    return (
      <div class={['m-grid', `m-grid-${p.direction}`]} style={style}>
        {slots.default?.()}
      </div>
    );
  };
}, {
  name: 'MGrid',
  props,
});
