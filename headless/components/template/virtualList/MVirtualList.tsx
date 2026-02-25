/**
 * @description headless 虚拟列表组件（sentinel 方案）
 * @author 阿怪
 * @date 2026/2/25 14:10
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * DOM 结构：
 *   .m-virtual-list (容器，overflow:auto)
 *     .m-virtual-list-spacer (撑出总高度，让滚动条正确)
 *       .m-virtual-list-wrapper (translateY 偏移，持有实际渲染项)
 *         [top-sentinel]
 *         ...items
 *         [bottom-sentinel]
 */
import { defineComponent } from 'vue';
import { props, useVirtualList } from '@shuimo-design/ui-core/components/template/virtualList';
import { VirtualListProps } from '@shuimo-design/ui-core/components/template/virtualList/props';
import './virtualList.css';

export default defineComponent(<T,>(
  _props: VirtualListProps<T>,
  _ctx: any,
) => {
  const { slots } = _ctx;
  const componentProps = _props as Required<VirtualListProps<T>>;

  const {
    displayList,
    containerRef,
    wrapperRef,
    topSentinelRef,
    bottomSentinelRef,
    totalHeight,
    offsetY,
  } = useVirtualList<T>({
    props: componentProps,
    onReachBottom: () => _ctx.emit('reachBottom'),
  });

  return () => {
    return <div class="m-virtual-list" ref={el => containerRef.value = el as HTMLElement}>
      <div class="m-virtual-list-spacer" style={{ height: `${totalHeight.value}px`, position: 'relative' }}>
        <div
          class="m-virtual-list-wrapper"
          ref={el => wrapperRef.value = el as HTMLElement}
          style={{ transform: `translateY(${offsetY.value}px)` }}
        >
          <div ref={el => topSentinelRef.value = el as HTMLElement} class="m-virtual-list-sentinel" style={{ height: '1px' }} />
          {
            (displayList.value ?? []).map((l: { data: T; index: number }) => {
              return slots.default?.(l);
            })
          }
          <div ref={el => bottomSentinelRef.value = el as HTMLElement} class="m-virtual-list-sentinel" style={{ height: '1px' }} />
        </div>
      </div>
    </div>;
  };
}, {
  name: 'MVirtualList',
  props,
  emits: ['reachBottom'],
});
