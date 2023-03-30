/**
 * @description web-component version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useTable, TableProps } from '@shuimo-design/core';

@createMElement({
  name: 'table',
  hookFunc: useTable
})
export default class  extends MElement implements TableProps {
  data?: Array<any>;
  height?: string | null;
}
