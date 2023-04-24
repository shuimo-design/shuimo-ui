/**
 * @description
 * @author 阿怪
 * @date 2023/2/7 17:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/button/button.css';
import { ButtonEvents, ButtonProps } from '@shuimo-design/core/lib/base/button';
import { Slot } from '../../types';


export default function MButton(props: ButtonProps & ButtonEvents & Slot) {

  const domType = props.link ? 'a' : 'button';
  return React.createElement(domType, {
    className: [
      'm-button',
      props.disabled ? 'm-button-disabled' : undefined,
      `m-button-${props.type ?? 'default'}`
    ].filter(e => e).join(' '),
    disabled: props.disabled,
    onClick: (e:MouseEvent)=>{
      if(props.disabled){
        e.preventDefault();
      }
      props.onClick?.(e);
    }
  }, props.children ?? props.text);
}
