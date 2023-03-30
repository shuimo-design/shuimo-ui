/**
 * @description web-component version tableColumn
 * @author 阿怪
 * @date 2023/03/11 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useTableColumn, TableColumnProps } from '@shuimo-design/core';

@createMElement({
  name: 'table-column',
  hookFunc: useTableColumn
})
export default class  extends MElement implements TableColumnProps {
  label?: string;
  param?: string;
  width?: string;

}
