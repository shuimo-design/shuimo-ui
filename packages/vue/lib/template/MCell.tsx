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
import { defineComponent, ref, onMounted, computed, watch, nextTick } from 'vue';
import { props } from '@shuimo-design/core/lib/template/cell/api';
import { useCell, type PC } from '@shuimo-design/core/lib/template/cell/useCell';

export default defineComponent({
  name: 'MCell',
  props,
  setup: (props, { slots }) => {

    const cellRef = ref();
    const w = ref(props.w);
    const h = ref(props.h);


    const { getSize } = useCell({
      props,
      value: { w, h }
    });
    watch(() => [props.a, props.b, props.c, props.d], () => {
      getSize(props);
    });

    onMounted(() => {
      nextTick(() => {
        // todo why???
        w.value = cellRef.value?.clientWidth;
        h.value = cellRef.value?.clientHeight;
      });
    });


    return () => {

      const { style, styleA, styleB, styleC, styleD } = getSize();

      const cell = <div class="m-cell-inner">
        {slots.default?.()}
      </div>;

      const cellWrapper = <div class={['m-cell']} ref={cellRef}>
        <div class="m-cell-main" style={style}>
          {cell}
        </div>
        <div class="m-cell-c m-cell-border-top" style={styleA}/>
        <div class="m-cell-v m-cell-border-right" style={styleB}/>
        <div class="m-cell-c m-cell-border-bottom" style={styleC}/>
        <div class="m-cell-v m-cell-border-left" style={styleD}/>
      </div>;

      return cellWrapper;
    };
  }
});
