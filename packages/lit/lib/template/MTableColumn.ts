/**
 * @description web-component version tableColumn
 * @author 阿怪
 * @date 2023/03/11 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { html, LitElement } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/template/tableColumn/api';
import { TableColumnProps } from '@shuimo-design/core/lib/template/tableColumn';

@createMElement({
  name: 'table-column',
  props
})
export default class  extends LitElement implements TableColumnProps {
  label?: string;
  param?: string;
  width?: string;

}
