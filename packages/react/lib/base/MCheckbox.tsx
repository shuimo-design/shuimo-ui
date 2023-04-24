/**
 * @description MCheckbox
 * @author 阿怪
 * @date 2023/2/8 20:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { memo, SyntheticEvent, useEffect, useState } from 'react';
import '@shuimo-design/core/lib/base/checkbox/checkbox.css';
import { CheckboxEvents, CheckboxProps } from '@shuimo-design/core/lib/base/checkbox';
import { initChecked, getNewModelValue } from '@shuimo-design/core/lib/base/checkbox/useCheckbox';
import { Slot } from '../../types';
import { notEmpty } from '@shuimo-design/tools/empty';


export default memo(function MCheckbox(props: CheckboxProps & CheckboxEvents & Slot) {

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const res = initChecked(props);
    setChecked(res);
  }, [
    props.checked,
    props.modelValue,
    props.value
  ]);

  const onClick = (e: SyntheticEvent) => {
    setChecked(!checked);
    const obj = getNewModelValue(props, !checked);
    props.onInput?.(obj);
  };

  const onChange = () => {

  };

  const label = <label className="m-checkbox-slot">
    {notEmpty(props.label) ? <span>{props.label}</span> : props.children}
  </label>;

  return <div className="m-checkbox"
              onClick={onClick}
              onChange={onChange}>
    <input type="checkbox" defaultChecked={checked}/>
    <div className="m-checkbox-checkbox"/>
    {checked ? <div className="m-checkbox-checkbox-inner"/> : null}
    {label}
  </div>;

});
