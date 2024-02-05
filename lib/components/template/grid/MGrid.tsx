/**
 * @description vue version grid
 * @author 阿怪
 * @date 2023/06/22 00:38
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * fix can not modify style in chrome
 */
import { defineComponent } from 'vue';
import { useGrid } from './useGrid.ts';
import { props } from './api.ts';
import './grid.css';

export default defineComponent((props, { slots }) => {
  const { getStyle, getGridClass, gridRef, calcCells } = useGrid({ props });
  return () => {
    const cells = slots.default?.()!;
    // inject props
    cells.forEach(c => {
      if (typeof c.type === 'object' &&
        c.type.hasOwnProperty('name') &&
        ['MCell', 'MGrid'].includes((c.type as any).name)) {
        if (props.w && c.props?.w == null) {
          if (!c.props) {c.props = {};}
          c.props.w = props.w;
        }
        if (props.h && c.props?.h == null) {
          if (!c.props) {c.props = {};}
          c.props.h = props.h;
        }
      }
    });

    calcCells(cells);

    return <div class={['m-grid', ...getGridClass()]} style={getStyle()}
                ref={el => gridRef.value = el as HTMLDivElement}>
      {cells}
    </div>;
  };
}, {
  name: 'MGrid',
  props
});
