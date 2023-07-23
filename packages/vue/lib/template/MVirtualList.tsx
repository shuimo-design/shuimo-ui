/**
 * @description vue version virtualList
 * @author 阿怪
 * @date 2023/07/18 20:53
 * @version v0.0.1-beta
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, ref } from 'vue';
import { props } from '@shuimo-design/core/lib/template/virtualList/api';
import { useVirtualList } from '@shuimo-design/core/lib/template/VirtualList/useVirtualList';

export default defineComponent({
  name: 'MVirtualList',
  props,
  emits: ['reachBottom'],
  setup: (props, { emit, slots }) => {
    const {
      containerRef,
      lastItemRef,
      displayList,
      styleRef
    } = useVirtualList({
      props, event: {
        reachBottom: () => emit('reachBottom')
      }
    }, ref);

    return () => {
      return <div class="m-virtual-list" ref={el => containerRef.value = el as HTMLElement}>
        <div class="m-virtual-list-max-height">
          <div class="m-virtual-list-wrapper" style={styleRef.value}>
            {
              (displayList.value ?? []).map(l => {
                return slots.default(l);
              })
            }
          </div>
        </div>
      </div>;
    };

  }
});
