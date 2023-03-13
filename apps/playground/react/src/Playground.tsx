/**
 * @description
 * @author 阿怪
 * @date 2023/2/6 17:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import {
  MButton,
  MForm,MFormItem,
  MTable,MTableColumn
} from '@shuimo-design/react/index';
import { useState } from 'react';

export default function Playground() {

  const [type, setType] = useState('primary');
  const [value, setValue] = useState('hello');
  const [disabled, setDisabled] = useState(false);

  const inputValue = (e: MouseEvent, value?: string | number) => {
    setValue(value as string);
  };

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

  const data=[
    { id: 1, param: '立春' },
    { id: 2, param: '雨水' },
    { id: 3, param: '惊蛰' },
    { id: 4, param: '春分' },
    { id: 5, param: '清明' },
    { id: 6, param: '谷雨' },
    { id: 7, param: '立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至、小寒、大寒' },
  ]

  return (
    <>

      <MTable data={data}>
        <MTableColumn param="id" label="序号"/>
        <MTableColumn param="param" label="参数"/>
        <MTableColumn param="option" label="操作"/>
      </MTable>

      {/*<span>{value}</span>*/}
      {/*<MButton disabled={disabled} onClick={clickButton2}>hi</MButton>*/}
      {/*<MButton type="primary" onClick={clickButton}>hi</MButton>*/}
      {/*<MCheckbox checked={checked} onChange={clickCheckbox}>开关</MCheckbox>*/}
      {/*<MBorder>*/}
      {/*  <div className="border-inner"></div>*/}
      {/*</MBorder>*/}
      {/*<MInput value={value}/>*/}
      {/*<MLi>你好</MLi>*/}
      {/*<MLi active>你好</MLi>*/}
      {/*<MSwitch value={checked} onClick={clickCheckbox}/>*/}
      {/*<span>{value}</span>*/}
      {/*<MRadio value={value} label="极客江湖" onClick={inputValue}/>*/}

      {/*<MTag>极客江湖</MTag>*/}
      {/*<MTag type="primary">极客江湖</MTag>*/}
      {/*<MTag type="error">极客江湖</MTag>*/}
      {/*<MTag type="confirm">极客江湖</MTag>*/}
      {/*<MTag type="warning">极客江湖</MTag>*/}

      {/*<div className="m-divider-wrapper">*/}
      {/*  <MDivider/>*/}
      {/*  <MDivider vertical/>*/}
      {/*</div>*/}

      {/*<MPopover content={*/}
      {/*            <div className="border-inner">*/}
      {/*              <div className="test">测试</div>*/}
      {/*            </div>*/}
      {/*          }>*/}
      {/*  <MButton>点击显示popover</MButton>*/}
      {/*</MPopover>*/}

      {/*<MProgress/>*/}
      {/*<MProgress showInfo={true} value={20}/>*/}

      {/*<MForm>*/}
      {/*  <MFormItem label="极客江湖">*/}
      {/*    <MButton>你好</MButton>*/}
      {/*  </MFormItem>*/}
      {/*  <MFormItem label="hi">*/}
      {/*    <MButton>你好</MButton>*/}
      {/*  </MFormItem>*/}
      {/*</MForm>*/}
    </>
  );
}


