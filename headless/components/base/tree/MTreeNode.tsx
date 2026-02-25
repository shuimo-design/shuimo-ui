/**
 * @description headless MTreeNode — 树节点递归渲染组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 通过 resolveComponent('MTreeNode') 实现自身递归渲染。
 * 组件必须在应用级别全局注册（name: 'MTreeNode'）才能被 resolveComponent 找到。
 */
import { defineComponent, h, resolveComponent } from 'vue';
import { treeNodeProps } from '@shuimo-design/ui-core/components/base/tree';
import { TreeNodeData, TreeNodeProps } from '@shuimo-design/ui-core/components/base/tree/props';

export default defineComponent((_props: TreeNodeProps, { attrs }) => {
  const props = _props as Required<TreeNodeProps>;

  return () => {
    const { label: l, key: k, children: c } = props.config;

    // resolveComponent 在渲染函数中调用，以支持递归
    const MTreeNodeComp = resolveComponent('MTreeNode');

    return (
      <>
        {props.data.map((d: TreeNodeData) => {
          // 获取当前节点的子节点数据
          const children = (d[c] as TreeNodeData[]) ?? [];
          const cKeys = children.map((it: TreeNodeData) => it[k] as string | number);
          const childNodes = props.getNodesByKeys(cKeys);
          const hasChildren = childNodes.length > 0;

          // 展开/收起箭头图标
          const icon = hasChildren
            ? (
              <span
                class={{ 'm-tree-icon': true, 'm-tree-icon__expand': d.expand }}
                onClick={(e: MouseEvent) => props.handleExpand(d, e)}
              />
            )
            : (
              // 无子节点时渲染占位元素，保持 label 对齐
              <span class="m-tree-icon-placeholder" />
            );

          // checkbox 模式的节点内容
          const renderCheckboxContent = () => (
            <label class="m-tree-node-content">
              {icon}
              <input
                class="m-tree-checkbox"
                type="checkbox"
                disabled={d.disabled}
                checked={d.checked}
                ref={undefined}
                onChange={(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  props.handleCheck(d, target.checked);
                }}
              />
              {/* indeterminate 需要通过 DOM property 设置，使用 ref 处理 */}
              <span
                class="m-tree-label m-tree-default-label"
                onClick={(e: MouseEvent) => props.handleItemClick(d, e)}
              >
                {d[l] as string}
              </span>
            </label>
          );

          // 普通模式的节点内容
          const renderDefaultContent = () => (
            <div class="m-tree-node-content">
              {icon}
              <span
                class="m-tree-label m-tree-default-label"
                onClick={(e: MouseEvent) => props.handleItemClick(d, e)}
              >
                {d[l] as string}
              </span>
            </div>
          );

          return (
            <div key={d[k] as string | number} {...attrs} class="m-tree-node">
              {props.checkbox ? renderCheckboxContent() : renderDefaultContent()}
              {/* 展开时递归渲染子节点 */}
              {(hasChildren && d.expand)
                ? (
                  <div class="m-tree-node-child">
                    {h(MTreeNodeComp, { ...props, data: childNodes })}
                  </div>
                )
                : null}
            </div>
          );
        })}
      </>
    );
  };
}, {
  name: 'MTreeNode',
  props: treeNodeProps,
  inheritAttrs: false,
});
