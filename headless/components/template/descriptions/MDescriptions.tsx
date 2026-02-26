/**
 * @description headless descriptions 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Comment, defineComponent, Fragment, VNode } from 'vue';
import { DescriptionsCore } from '@shuimo-design/ui-core';
import { DescriptionsProps } from '@shuimo-design/ui-core/components/template/descriptions/props';
import './descriptions.css';

const { descriptionsProps } = DescriptionsCore;

export default defineComponent((_props: DescriptionsProps, { slots }) => {
  const props = _props as Required<DescriptionsProps>;

  return () => {
    const column = props.column ?? 3;
    const direction = props.direction ?? 'horizontal';
    const isVertical = direction === 'vertical';

    // 收集 MDescriptionsItem 子节点
    const items: VNode[] = [];
    const defaultSlot: VNode[] = slots.default?.() ?? [];

    const collectItems = (vnodes: VNode[]) => {
      vnodes.forEach(vnode => {
        if (vnode.type === Fragment) {
          collectItems((vnode.children as VNode[]) ?? []);
          return;
        }
        if (vnode.type === Comment) return;
        if (typeof vnode.type === 'object' && (vnode.type as { name?: string }).name === 'MDescriptionsItem') {
          items.push(vnode);
        }
      });
    };
    collectItems(defaultSlot);

    // 将 items 按 column 分行，尊重 span
    const rows: VNode[][] = [];
    let currentRow: VNode[] = [];
    let currentSpanSum = 0;

    items.forEach(item => {
      const span = (item.props?.span as number) ?? 1;
      if (currentSpanSum + span > column && currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
        currentSpanSum = 0;
      }
      currentRow.push(item);
      currentSpanSum += span;
      if (currentSpanSum >= column) {
        rows.push(currentRow);
        currentRow = [];
        currentSpanSum = 0;
      }
    });
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    // 渲染单个 item 的标签+值
    const renderItem = (item: VNode, span: number) => {
      const label = item.props?.label as string ?? '';
      const itemSlots = item.children as Record<string, () => VNode[]> | null;
      const valueContent = itemSlots?.default?.() ?? null;

      const colSpan = span > 1 ? span : undefined;

      if (isVertical) {
        // 垂直方向：label 在上，value 在下，各占一格
        return (
          <>
            <div class="m-descriptions-cell m-descriptions-label" style={{ gridColumn: colSpan ? `span ${colSpan * 2}` : undefined }}>
              {label}
            </div>
            <div class="m-descriptions-cell m-descriptions-content" style={{ gridColumn: colSpan ? `span ${colSpan * 2}` : undefined }}>
              {valueContent}
            </div>
          </>
        );
      }

      // 水平方向：label 和 value 并排，各占 1 格（span 作用于整个对）
      return (
        <div class="m-descriptions-pair" style={{ gridColumn: colSpan ? `span ${colSpan}` : undefined }}>
          <span class="m-descriptions-label">{label}</span>
          <span class="m-descriptions-content">{valueContent}</span>
        </div>
      );
    };

    // grid-template-columns：水平模式每 item 占 1 列，垂直模式 label+value 共用一列
    const gridColumns = isVertical
      ? `repeat(${column * 2}, 1fr)`
      : `repeat(${column}, 1fr)`;

    return (
      <div class={{
        'm-descriptions': true,
        'm-descriptions-border': props.border,
        [`m-descriptions-${props.size ?? 'medium'}`]: true,
        [`m-descriptions-${direction}`]: true,
      }}>
        {/* 可选标题 */}
        {props.title && <div class="m-descriptions-header">{props.title}</div>}

        {/* 内容网格 */}
        <div class="m-descriptions-body" style={{ gridTemplateColumns: gridColumns }}>
          {rows.map(rowItems =>
            rowItems.map(item => renderItem(item, (item.props?.span as number) ?? 1))
          )}
        </div>
      </div>
    );
  };
}, {
  name: 'MDescriptions',
  props: descriptionsProps,
});
