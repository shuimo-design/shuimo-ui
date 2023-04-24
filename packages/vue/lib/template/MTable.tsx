/**
 * @description vue version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/template/table/api';
import { useTable } from '@shuimo-design/core/lib/template/table/useTable';

export default defineComponent({
  name: 'MTable',
  props,
  setup: (props, { slots }) => {
    const { initTable } = useTable();

    return () => {

      const { thead, tbody } = initTable({
        empty: <div class="m-table-empty">暂无数据</div>,
        tbodyTr: data => <td class="m-td">{data}</td>,
        theadTh: label => <th class="m-th">{label}</th>,
        thead: ths => <thead class="m-thead">
        <tr>{ths}</tr>
        </thead>,
        tbody: trs => <tbody class="m-tbody">{trs}</tbody>,
        tbodyTrs: (tds, i) => <tr class="m-tr">{...tds}
          {i === 0 ? undefined : <td class="m-table-tbody-img"/>}
        </tr>
      }, slots.default(), props.data);


      const table = <table class="m-table-inner">
        {thead}
        {tbody}
      </table>;

      return <div class="m-table">
        <div class="m-table-header-img-top"/>
        <div class="m-table-header-img-bottom"/>
        <div class="m-table-wrap">
          {table}
        </div>
        <div class="m-table-border-img-bottom"/>
      </div>;

    };
  }
});
