/**
 * @description vue version tree
 * @author Jobin
 * @date 2023/6/24 23:27
 * @version v1.0.0
 */
import { defineComponent, h, resolveComponent } from 'vue';
import MCheckbox from '../checkbox/MCheckbox';
import { treeNodeProps } from './api.ts';
import { TreeNodeProps } from './treeNode';


type TreeChildren = any; // todo fix this type,maybe use generics
export default defineComponent((_props: TreeNodeProps, { attrs }) => {
  const props = _props as Required<TreeNodeProps>;
  return () => {
    const { label: l, key: k, children: c } = props.config;

    const MTreeNode = resolveComponent('MTreeNode');
    return <>
      {
        props.data.map((d) => {
          const children = d[c] ?? [];
          const cKeys = children.map((it: TreeChildren) => it[k]);
          const childNodes = props.getNodesByKeys(cKeys);
          const icon = childNodes.length > 0 ? <span class={{ 'm-tree-icon': true, 'm-tree-icon__expand': d.expand }}
                                                     onClick={(e) => props.handleExpand(d, e)}></span> : null;

          const checkbox = props.checkbox ?
            // @ts-ignore todo fix this type
            <MCheckbox class="m-tree-checkbox" disabled={d.disabled} indeterminate={d.indeterminate}
                       modelValue={d.checked}
                       onChange={(checked: boolean) => props.handleCheck(d, checked)}>
              <slot name="default">
                  <span class="m-tree-default-label"
                        onClick={(e: MouseEvent) => props.handleItemClick(d, e)}>{d[l]}</span>
              </slot>
            </MCheckbox>
            : <slot name="default" {...{ node: d }}>
                <span class="m-tree-default-label"
                      onClick={(e: MouseEvent) => props.handleItemClick(d, e)}>{d[l]}</span>
            </slot>;


          return <div key={d[k]} {...attrs} class="m-tree-node">
            {icon}
            {checkbox}
            {(childNodes.length > 0 && d.expand) ?
              <div class={{ 'm-tree-node-child': true }}>
                {h(MTreeNode, { ...props, data: childNodes })}
              </div> : null}
          </div>;
        })
      }
    </>;
  };
}, {
  name: 'MTreeNode',
  props: treeNodeProps,
  inheritAttrs: false
});
