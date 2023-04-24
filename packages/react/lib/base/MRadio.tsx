/**
 * @description react version MRadio
 * @author 阿怪
 * @date 2023/2/26 20:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { useState } from 'react';
import { RadioEvents, RadioProps } from '@shuimo-design/core/lib/base/radio';
import { Slot } from '../../types';
import { initChecked } from '@shuimo-design/core/lib/base/radio/useRadio';
import { withDefault } from '../../base/tools';
import { props as radioProps } from '@shuimo-design/core/lib/base/radio/api';
import { getNewModelValue, createRadioId } from '@shuimo-design/core/lib/base/radio/useRadio';
import '@shuimo-design/core/lib/base/radio/radio.css';

export default function MRadio(baseProps: RadioProps & RadioEvents & Slot) {
  const props = withDefault(baseProps, radioProps);

  const [checked] = useState(initChecked(props));

  const slotsDefault = props.children ?? props.label;
  const onClick = (e: any) => {
    baseProps.onClick?.(e, getNewModelValue(props, checked));
  };
  const id = createRadioId();


  return <label className="m-radio" htmlFor={id}>
    <input type="radio" className="m-radio-input" id={id}
           name={props.name} defaultChecked={checked} value={props.value}
           onClick={onClick}/>
    {slotsDefault}
  </label>;

}
