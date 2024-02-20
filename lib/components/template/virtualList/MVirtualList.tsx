/**
 * @description vue version virtualList
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo unstable, need to fix it
 */
import { defineComponent } from 'vue';
import { props } from './api.ts';
import { useVirtualList } from './useVirtualList.ts';
import './virtualList.css';

export default defineComponent((props, { emit, slots }) => {
  const {
    containerRef,
    displayList,
    styleRef,
  } = useVirtualList({
    props, event: {
      reachBottom: () => emit('reachBottom'),
    },
  });

  return () => {
    return <div class="m-virtual-list" ref={el => containerRef.value = el as HTMLElement}>
      <div class="m-virtual-list-max-height">
        <div class="m-virtual-list-wrapper" style={styleRef.value}>
          {
            // todo fix any
            (displayList.value ?? []).map((l: any) => {
              return slots.default?.(l);
            })
          }
        </div>
      </div>
    </div>;
  };

}, {
  name: 'MVirtualList',
  props,
  emits: ['reachBottom'],
});
