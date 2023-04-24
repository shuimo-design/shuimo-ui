/**
 * @description react version MSwitch
 * @author 阿怪
 * @date 2023/2/18 22:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo click event
 */
import React from 'react';
import { useState } from 'react';
import { SwitchEvents, SwitchProps } from '@shuimo-design/core/lib/base/switch';
import { isEmpty } from '@shuimo-design/tools/empty';
import { Slot } from '../../types';
import '@shuimo-design/core/lib/style/global.css';
import '@shuimo-design/core/lib/base/switch/switch.css';


export default function MSwitch(props: SwitchProps & SwitchEvents & Slot) {

  let baseActiveValue = props.activeValue;
  let baseInactiveValue = props.inactiveValue;

  const isBoolean = typeof props.value === 'boolean';

  if (isBoolean) {
    // 如果activeValue和inactiveValue都为空
    if (isEmpty(props.activeValue) && isEmpty(props.inactiveValue)) {
      baseActiveValue = true;
      baseInactiveValue = false;
    }
  }

  const [activeValue, setActiveValue] = useState(baseActiveValue);
  const [inactiveValue, setInactiveValue] = useState(baseInactiveValue);

  const isActive = props.value === activeValue;

  const changeSwitch = () => {

  }

  const getInfo = (key: keyof Pick<SwitchProps, 'activeInfo' | 'inactiveInfo'>) => {
    // if (props.children[key]) {
    //   return slots[key]!();
    // }
    // return <span class="m-switch-span">{props[key]}</span>;
    return <span className="m-switch-span">{props[key]}</span>;
  };

  return <div className={[
    'm-switch',
    isActive ? 'm-switch-active' : 'm-switch-inactive',
    props.loading ? 'm-switch-loading' : '',
    props.disabled ? 'm-switch-disabled' : ''
  ].join(' ')}>
    {getInfo('activeInfo')}
    <div className="m-switch-main">
      <div className="m-switch-core" onClick={changeSwitch}>
        <div className="m-switch-core-border"></div>
      </div>
    </div>
    {getInfo('inactiveInfo')}
  </div>
}
