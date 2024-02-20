/**
 * @description MMenuItem component
 * @author 阿怪
 * @date 2023/8/3 16:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent, h, ref, resolveComponent } from 'vue';
import MLi from '../../base/li/MLi.tsx';
import { TreeNodeData } from '../../base/tree';
import { treeNodeProps } from '../../base/tree/api.ts';
import { TreeNodeProps } from '../../base/tree/treeNode';

type TreeChildren = any; // todo fix this type,maybe use generics
type MenuItemProps = TreeNodeProps & { root?: boolean };
export default defineComponent((_props: MenuItemProps) => {
  const props = _props as Required<MenuItemProps>;
  const MMenuItem = resolveComponent('MMenuItem');

  const itemRef = ref<HTMLElement | null>();

  const clickEvent = (e: MouseEvent, d: TreeNodeData) => {
    if (e.target === itemRef.value) {
      return;
    }
    props.handleItemClick?.(d, e);
    e.stopPropagation();
  };

  return () => {
    const { label: l, key: k, children: c } = props.config;

    return <>{
      props.data.map(d => {
        const children = d[c] ?? [];
        const cKeys = children.map((it: TreeChildren) => it[k]);
        const childNodes = props.getNodesByKeys(cKeys);
        // @ts-ignore todo fix this type
        return <MLi class={['m-menu-item', { 'm-menu-main-root-item': props.root }]} active={d.isActive}
                    icon={props.root}
                    onClick={(e: MouseEvent) => clickEvent(e, d)}>
          <span class="m-cursor-pointer">{d[l]}</span>
          {(childNodes.length > 0 && d.expand) ? <div class="m-menu-item-child"
                                                      ref={el => itemRef.value = el as HTMLElement}>
            {h(MMenuItem, { ...props, root: false, data: childNodes })}
          </div> : null}

        </MLi>;
      })
    }</>;
  };

}, {

  name: 'MMenuItem',
  props: {
    ...treeNodeProps,
    root: { type: Boolean, default: false },
  },
  inheritAttrs: false,
});
