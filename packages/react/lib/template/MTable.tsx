/**
 * @description react version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useTable, TableProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';

export default function MTable(props: TableProps & Slot) {
  const { getTemplate } = useTable();

  return cr(getTemplate({ props, slots: props.children }), props);
}

