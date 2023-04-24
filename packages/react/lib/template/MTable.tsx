/**
 * @description react version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/template/table/table.css';
import { TableProps } from '@shuimo-design/core/lib/template/table';
import { Slot } from '../../types';
import { useTable } from '@shuimo-design/core/lib/template/table/useTable';
import { withDefault } from '../../base/tools';
import { props as tableProps } from '@shuimo-design/core/lib/template/table/api';

export default function MTable(baseProps: TableProps & Slot) {
  const { initTable } = useTable();
  const props = withDefault(baseProps, tableProps);

  if (!props.children) {
    console.error('MTable: children is required');
    return null;
  }

  const { thead, tbody } = initTable<React.ReactElement>({
    empty: <div className="m-table-empty">暂无数据</div>,
    tbodyTr: data => <td className="m-td">{data}</td>,
    theadTh: label => <th key={`m-table-head-th-${label}`} className="m-th">{label}</th>,
    thead: ths => <thead className="m-thead">
    <tr>{ths}</tr>
    </thead>,
    tbody: trs => <tbody className="m-tbody">{trs}</tbody>,
    tbodyTrs: (tds, i) => <tr key={`m-table-colum-${i}`} className="m-tr">{...tds}
      {i === 0 ? undefined : <td className="m-table-tbody-img"/>}
    </tr>
  }, props.children as React.ReactNode[], props.data);

  const table = <table className="m-table-inner">
    {thead}
    {tbody}
  </table>;

  return <div className="m-table">
    <div className="m-table-header-img-top"/>
    <div className="m-table-header-img-bottom"/>
    <div className="m-table-wrap">
      {table}
    </div>
    <div className="m-table-border-img-bottom"/>
  </div>;
}

