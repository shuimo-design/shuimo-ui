/**
 * @description react version list
 * @author 阿怪
 * @date 2023/05/04 22:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/list/list.css';
import { ListProps } from '@shuimo-design/core/lib/base/list';
import { useList } from '@shuimo-design/core/lib/base/list/useList';
import MLi from './MLi';

export default function MList(props: ListProps & { children?: React.JSXElementConstructor<any> }) {

  const { baseRender, dataValidate } = useList();

  if (!dataValidate(props.data)) {
    return null;
  }

  if (props.children && typeof props.children !== 'function') {
    throw new Error('children must be a function');
  }

  return <div className="m-list">
    {props.data!.map((d, i) => React.createElement(MLi, {
      key: `m-list-li-${i}`,
      active: d.active ?? props.autoActive,
      children: props.children ? React.createElement(props.children, { data: d }) : baseRender(d)
    }))}
  </div>;
}

