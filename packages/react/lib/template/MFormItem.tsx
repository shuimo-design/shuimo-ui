/**
 * @description react version formItem
 * @author 阿怪
 * @date 2023/05/04 20:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/template/form/formItem.css';
import { FormItemProps } from '@shuimo-design/core/lib/template/form/formItem';
import { Slot } from '../../types';

export default function MFormItem(props: FormItemProps & {
  label: string | React.ReactNode | React.ReactNode[]
} & Slot) {

  const labelSlot = props.label;
  const defaultSlot = props.children;
  return <div className="m-form-item">
    <label htmlFor={props.prop} className="m-form-item-label">
      {labelSlot}
    </label>
    <div className="m-form-item-content">{defaultSlot}</div>
  </div>;
}

