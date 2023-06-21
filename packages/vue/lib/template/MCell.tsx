/**
 * @description vue version cell
 * @author 阿怪
 * @date 2023/06/21 01:05
 * @version v0.0.1-beta
 *
 * todo core code need move to core hook
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref, onMounted, computed, watch, nextTick } from 'vue';
import { props } from '@shuimo-design/core/lib/template/cell/api';
import { CELL_OPTIONS, useCell } from '@shuimo-design/core/lib/template/cell/useCell';

export default defineComponent({
  name: 'MCell',
  props,
  setup: (props, { slots }) => {

    const position = props.rotatePosition ?? 'bottom-left';// todo for test
    const { getStyle, getDeg, mCellClass } = useCell({ props });

    const deg = getDeg();

    const h = ref(props.h);
    const w = ref(props.w);
    const cellRef = ref();
    const minusW = computed(() => Math.abs(Math.tan(deg * Math.PI / 180) * h.value));
    const pec = computed(() => minusW.value / w.value);


    onMounted(() => {
      nextTick(() => {
        // todo why???
        w.value = cellRef.value?.clientWidth;
      });
    });

    const options = computed(() => CELL_OPTIONS[position]);

    return () => {

      const cell = <div class="m-cell-inner">
        {slots.default?.()}
      </div>;

      const coefficient = Math.cos(deg * Math.PI / 180);

      const style = {
        ...getStyle(pec.value),
        '--m-cell-cos': coefficient,
        '--m-cell-deg': `rotate(${deg * -1}deg)`,
        '--m-cell-minus-w': `${minusW.value}px`,
        ...options.value
      };


      const cellWrapper = <div class={['m-cell', ...mCellClass()]} style={style} ref={cellRef}>
        <div class="m-cell-main">
          {cell}
        </div>
        <div class="m-cell-c m-cell-border-top"/>
        <div class="m-cell-c m-cell-border-bottom"/>
        <div class="m-cell-v m-cell-border-left"/>
        <div class="m-cell-v m-cell-border-right"/>
      </div>;

      return cellWrapper;
    };
  }
});
