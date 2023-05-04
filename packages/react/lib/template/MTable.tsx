/**
 * @description react version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { ReactElement } from 'react';
import '@shuimo-design/core/lib/template/table/table.css';
import { TableProps } from '@shuimo-design/core/lib/template/table';
import { Slot } from '../../types';
import { useTable } from '@shuimo-design/core/lib/template/table/useTable';
import { withDefault } from '../../base/tools';
import { props as tableProps } from '@shuimo-design/core/lib/template/table/api';


const getSlot = (node: React.ReactNode, slotName: string) => {
  if (!node) {
    return null;
  }
  if (!node.hasOwnProperty('props')) {
    console.trace('MTable: children is not ReactElement');
    return null;
  }
  if ((node as ReactElement).props.slot === slotName) {
    return node;
  }
  return null;
};

export default function MTable(baseProps: TableProps & Slot) {
  const { initTable } = useTable();
  const props = withDefault(baseProps, tableProps);

  if (!props.children) {
    console.error('MTable: children is required');
    return null;
  }
  let emptySlot;
  let columns: React.ReactNode[] = [];
  if (Array.isArray(props.children)) {

    props.children.forEach(item => {
      const currentEmptySlot = getSlot(item, 'empty');
      if (currentEmptySlot) {
        emptySlot = currentEmptySlot;
      } else {
        columns.push(item);
      }
    });
  } else {
    const currentEmptySlot = getSlot(props.children, 'empty');
    if (currentEmptySlot) {
      emptySlot = currentEmptySlot;
    } else {
      columns = [props.children];
    }
  }


  const { thead, tbody } = initTable<React.ReactElement>({
    empty: <tbody className="m-table-empty">
    <tr>
      <th colSpan={columns.length}>{emptySlot ? emptySlot : '暂无数据'}</th>
    </tr>
    </tbody>,
    tbodyTr: ({ data, slot, slotInfo }) => <td className="m-td">{
      slot ? slot({ data: slotInfo?.data, index: slotInfo?.index }) : data
    }</td>,
    theadTh: ({ label, slot }) => <th key={`m-table-head-th-${label}`} className="m-th">{
      slot ? slot : label
    }</th>,
    thead: ths => <thead className="m-thead">
    <tr className="m-tr">{ths}</tr>
    </thead>,
    tbody: trs => <tbody className="m-tbody">{trs}</tbody>,
    tbodyTrs: (tds, i) => <tr key={`m-table-colum-${i}`} className="m-tr">{...tds}
      <td className="m-table-tbody-img"/>
    </tr>,
    initSlot: tableColumn => {
      let body, head;

      const bodySlot = tableColumn.props.body;
      if (bodySlot) {
        body = bodySlot;
      }
      if (tableColumn.props.children) {
        let headSlot;
        if (Array.isArray(tableColumn.props.children)) {
          tableColumn.props.children.forEach((item: React.ReactNode) => {
            const currentHeadSlot = getSlot(item, 'head');
            if (currentHeadSlot) {
              headSlot = currentHeadSlot;
            }
          });
        } else {
          const currentHeadSlot = getSlot(tableColumn.props.children, 'head');
          if (currentHeadSlot) {
            headSlot = currentHeadSlot;
          }
        }
        if (headSlot) {
          head = headSlot;
        }
      }
      return { body, head };
    }
  }, columns, props.data);

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

