/**
 * @description web-component version list
 * @author 阿怪
 * @date 2023/05/04 22:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix data type
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { createMElement } from '../../base/createElement';
import { props } from '@shuimo-design/core/lib/base/list/api';
import { ListProps } from '@shuimo-design/core/lib/base/list';
import style from '@shuimo-design/core/lib/base/list/list.css?inline';
import { useList } from '@shuimo-design/core/lib/base/list/useList';

const { baseRender, dataValidate } = useList();
@createMElement({
  name: 'list',
  props: {
    ...props,
    data: { type: String, default: '' }
  }
})
export default class extends LitElement implements Omit<ListProps, 'data'> {
  autoActive: boolean = false;
  data: string = '';


  static styles = unsafeCSS(style);

  MLiRender(data: any, active: boolean) {
    return html`
      <m-li .active=${active}>${data}</m-li>`;
  }

  get parseData() {
    const _data = JSON.parse(this.data);
    if (!dataValidate(_data)) return [];
    return _data as any[];
  }

  render() {
    return html`
      <div class="m-list">
        ${this.parseData.map(d => this.MLiRender(baseRender(d), this.autoActive))}
      </div>`;
  }

}
