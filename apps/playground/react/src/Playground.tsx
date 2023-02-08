/**
 * @description
 * @author 阿怪
 * @date 2023/2/6 17:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { MButton, MCheckbox, MBorder } from '@shuimo-design/react/index';
import { useState } from 'react';

export default function Playground() {

  const [type, setType] = useState('primary');
  const [disabled, setDisabled] = useState(false);

  const clickButton = () => {
    console.log('hi', disabled);
    if (type === 'primary') {
      setType('warn');
      setDisabled(true);
    } else {
      setType('primary');
      setDisabled(false);
    }
  };

  const [checked, setChecked] = useState(true);
  const clickCheckbox = (e: Event) => {
    console.log('click', e.target, checked);
    setChecked(!checked);
  };

  const clickButton2 = () => {
    console.log('hello');
  };


  return (
    <>
      <MButton disabled={disabled} onClick={clickButton2}>hi</MButton>
      <MButton type="primary" onClick={clickButton}>hi</MButton>
      <MCheckbox checked={checked} onChange={clickCheckbox}>开关</MCheckbox>
      <MBorder>
        <div className="border-inner"></div>
      </MBorder>
    </>
  );
}


