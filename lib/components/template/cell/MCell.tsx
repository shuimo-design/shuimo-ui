/**
 * @description vue version cell
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v0.0.1-beta
 *
 * fix like :a="20" :b="10" :c="25" :d="60" quadrilateral can not close , should throw error
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, watch } from 'vue';
import { props } from './api.ts';
import { useCell } from './useCell.ts';
import { CellProps } from './index';
import './cell.css';

export default defineComponent((_props: CellProps, { slots }) => {
  const props = _props as Required<CellProps>;
  const { getSize, cellRef } = useCell({
    props,
  });

  watch(() => [props.a, props.b, props.c, props.d], () => {
    getSize(props);
  });

  // a magic strict way
  const defaultWH = {
    'min-width': props.w !== 0 ? `${props.w}px` : undefined,
    'max-width': props.w !== 0 ? `${props.w}px` : undefined,
    'min-height': props.h !== 0 ? `${props.h}px` : undefined,
    'max-height': props.h !== 0 ? `${props.h}px` : undefined,
  };


  return () => {

    const { style, styleA, styleB, styleC, styleD } = getSize();

    return <div class={['m-cell']} ref={el => {
      cellRef.value = el as HTMLDivElement;
    }} style={{ ...defaultWH, ...props.style }}>
      <div class="m-cell-main" style={{ ...defaultWH, ...style }}>
        {slots.default?.()}
      </div>
      <div class="m-cell-c m-cell-border-top" style={styleA}/>
      <div class="m-cell-v m-cell-border-right" style={styleB}/>
      <div class="m-cell-c m-cell-border-bottom" style={styleC}/>
      <div class="m-cell-v m-cell-border-left" style={styleD}/>
    </div>;
  };
}, {
  name: 'MCell',
  props,
});
