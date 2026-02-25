/**
 * @description headless table 组件，无视觉样式，仅提供结构和逻辑
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Comment, defineComponent, Fragment } from 'vue';
import { TableCore, useTable } from '@shuimo-design/ui-core/components/template/table';
import { TableProps } from '@shuimo-design/ui-core/components/template/table/props';
import './table.css';

const { props } = TableCore;

export default defineComponent((_props: TableProps, { slots }) => {
  const p = _props as Required<TableProps>;
  const { initTable } = useTable();

  return () => {
    // 收集 MTableColumn VNode，处理 v-for 生成的 Fragment 和注释节点
    const columns: any[] = [];
    const defaultSlot: any[] = slots.default?.() ?? [];

    defaultSlot.forEach(s => {
      // v-for 生成的列表会包裹在 Fragment 中，需要展开
      if (s.type === Fragment) {
        (s.children as any[])?.forEach(c => columns.push(c));
        return;
      }
      // 跳过注释节点（v-if 为 false 时产生）
      if (s.type === Comment) return;
      // 只接受 MTableColumn 子节点
      if (typeof s.type === 'object' && (s.type as any).name === 'MTableColumn') {
        columns.push(s);
      }
    });

    const style = p.height ? { height: p.height } : undefined;

    const { thead, tbody } = initTable({
      // 数据为空时的占位渲染
      empty: (
        <tbody class="m-table-empty">
          <tr>
            <th colspan={columns.length}>
              {slots.empty?.() ?? '暂无数据'}
            </th>
          </tr>
        </tbody>
      ),
      // 渲染单个数据单元格
      tbodyTr: ({ data, param, slot, style: cellStyle, slotInfo }) => (
        <td
          style={cellStyle}
          class={['m-td', p.paramClass ? `m-td-${param}` : null]}
        >
          {slot ? slot({ data: slotInfo?.data, index: slotInfo?.index }) : data}
        </td>
      ),
      // 渲染单个表头单元格
      theadTh: ({ label, param, slot, style: cellStyle }) => (
        <th
          class={['m-th', p.paramClass ? `m-th-${param}` : null]}
          style={cellStyle}
        >
          {slot ? slot() : label}
        </th>
      ),
      // 渲染整个 thead
      thead: ths => (
        <thead class="m-thead">
          <tr class="m-tr">{ths}</tr>
        </thead>
      ),
      // 渲染整个 tbody
      tbody: trs => <tbody class="m-tbody">{trs}</tbody>,
      // 渲染单行 tr
      tbodyTrs: tds => <tr class="m-tr">{...tds}</tr>,
      // 从 MTableColumn VNode 中提取 body / head 插槽
      initSlot: tableColumn => {
        const children = tableColumn.children;
        if (!children || Array.isArray(children) || typeof children !== 'object') {
          return undefined;
        }
        return {
          body: children.default,
          head: children.head,
        };
      },
    }, columns, p.data);

    return (
      <div class="m-table" style={style}>
        <table class="m-table-inner">
          {thead}
          {tbody}
        </table>
      </div>
    );
  };
}, { name: 'MTable', props });
