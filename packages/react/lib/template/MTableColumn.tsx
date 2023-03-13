/**
 * @description react version tableColumn
 * @author 阿怪
 * @date 2023/03/11 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useTableColumn, TableColumnProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default function MTableColumn(props: TableColumnProps ) {
  const { getTemplate } = useTableColumn();

  return cr(getTemplate({ props }),props)
}

