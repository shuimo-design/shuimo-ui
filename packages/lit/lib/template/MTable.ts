/**
 * @description web-component version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { queryAssignedElements, state } from 'lit/decorators.js';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/table/api';
import style from '@shuimo-design/core/lib/template/table/table.css?inline';
import { TableColumnProps } from '@shuimo-design/core/lib/template/tableColumn';
import { useTable } from '@shuimo-design/core/lib/template/table/useTable';


const { initTable } = useTable();
@createMElement({
  name: 'table',
  props: {
    ...props,
    data: { type: String }
  }
})
// export default class extends LitElement implements TableProps {
export default class extends LitElement {
  data?: string;
  height?: string | null;
  static styles = unsafeCSS(style);

  @state()
  protected thead = html``;

  @state()
  protected tbody = html``;

  @queryAssignedElements()
  _columns!: Array<HTMLElement>;

  handleSlotChange() {
    const slots: Array<{ props: TableColumnProps }> = [];
    this._columns.forEach((column) => {
      const width = column.getAttribute('width') ?? undefined;
      const param = column.getAttribute('param') ?? undefined;
      const label = column.getAttribute('label') ?? undefined;
      slots.push({ props: { width, param, label } });
    });

    const { thead, tbody } = initTable({
      empty: html`
        <div class="m-table-empty">暂无数据</div>`,
      tbodyTr: data => html`
        <td class="m-td">${data}</td>`,
      theadTh: label => html`
        <th class="m-th">${label}</th>`,
      thead: ths => html`
        <thead class="m-thead">
        <tr>${ths}</tr>
        </thead>`,
      tbody: trs => html`
        <tbody class="m-tbody">${trs}</tbody>`,
      tbodyTrs: (tds, i) => html`
        <tr class="m-tr">${tds}
          ${i === 0 ? undefined : html`
            <td class="m-table-tbody-img"></td>`}
        </tr>`
    }, slots, JSON.parse(this.data??'') ?? []);
    this.thead = thead;
    this.tbody = tbody;
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div class="m-table">
        <div class="m-table-header-img-top"></div>
        <div class="m-table-header-img-bottom"></div>
        <div class="m-table-wrap">
          <table class="m-table-inner">
            ${this.thead}
            ${this.tbody}
          </table>
        </div>
        <div class="m-table-border-img-bottom"></div>
      </div>`;
  }
}
