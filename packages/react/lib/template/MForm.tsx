/**
 * @description react version form
 * @author 阿怪
 * @date 2023/05/04 20:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/template/form/form.css';
import { FormProps } from '@shuimo-design/core/lib/template/form/form';
import { clsx } from '@shuimo-design/tools/index';
import { Slot } from '../../types';

export default function MForm(props: FormProps & Slot) {
  return <form className={clsx({
    'm-form': true,
    'm-form-inline': props.inline
  })} onSubmit={e=>{
    if(!props.submit){
      e.preventDefault();
    }
  }}>
    {props.children}
  </form>;
}

