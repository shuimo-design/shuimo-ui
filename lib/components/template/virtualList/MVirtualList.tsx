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
import { defineComponent, SetupContext } from 'vue';
import { props } from './api.ts';
import { useVirtualList } from './useVirtualList.ts';
import './virtualList.css';
import { VirtualListProps } from './index';

export default defineComponent(<T extends any>(
  _props: VirtualListProps<T>,
  _ctx: any, // todo https://github.com/vuejs/core/pull/7963#issuecomment-1762516240
) => {
  const props = _props as Required<VirtualListProps>;
  const { emit, slots } = _ctx as SetupContext;
  const {
    containerRef,
    displayList,
    styleRef,
  } = useVirtualList<T>({
    props,
    event: {
      reachBottom: () => emit('reachBottom'),
    },
  });

  return () => {
    return <div class="m-virtual-list" ref={el => containerRef.value = el as HTMLElement}>
      <div class="m-virtual-list-max-height">
        <div class="m-virtual-list-wrapper" style={styleRef.value}>
          {
            (displayList.value ?? []).map((l: { data: T, index: number }) => {
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
