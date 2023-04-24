/**
 * @description
 * @author 阿怪
 * @date 2023/4/21 11:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MButton, MCheckbox, MInput, MProgress,MRadio,MSwitch,MTag } from '@shuimo-design/react/index';
import { useState } from 'react';

export default function Base() {
  const buttonClick = () => {console.log('button click');};

  const button = <div>
    <MButton onClick={buttonClick}>你好</MButton>
    <MButton type="error">error</MButton>
    <MButton type="primary">primary</MButton>
    <MButton type="confirm">confirm</MButton>
    <MButton type="warning">warning</MButton>
    <MButton link>link</MButton>
    <MButton disabled onClick={buttonClick}>disabled</MButton>
    <MButton text="text！"></MButton>
  </div>;


  const [inputVal, setVale] = useState('input value');
  const inputChange = (e: Event & { target: any }) => {
    setVale(e.target.value);
  };
  const input = <div>
    <span>{inputVal}</span>
    <br/>
    <MInput value={inputVal} onInput={inputChange}/>
    <MInput readonly value={inputVal} onInput={inputChange}/>
    <MInput disabled value={inputVal} onInput={inputChange}/>
    <MInput type="textarea"></MInput>
  </div>;


  const [checkboxVal, setCheckboxVal] = useState(true);
  const [checkboxValNumber, setCheckboxValNumber] = useState(1);
  const obj = { label: 'label', value: 'value' };
  const [checkboxObject, setCheckboxObject] = useState({
    value: obj
  });
  const checkboxChange = (e: any) => {
    setCheckboxVal(e);
  };

  const checkbox = <div className="checkbox">
    <span>{checkboxVal ? 'true' : 'false'}</span>
    <br/>
    <MCheckbox/>
    <MCheckbox disabled></MCheckbox>
    <MCheckbox modelValue={checkboxVal} onInput={checkboxChange}></MCheckbox>
    <MCheckbox>slot</MCheckbox>
    <MCheckbox label="label"></MCheckbox>
    <MCheckbox label="label">replace by label</MCheckbox>
    <MCheckbox checked={true}>default checked</MCheckbox>
    <br/>
    <span>checkboxValNumber:{checkboxValNumber}</span>
    <br/>
    <MCheckbox modelValue={checkboxValNumber} onInput={setCheckboxValNumber} value={1}>number value 1</MCheckbox>
    <br/>
    <MCheckbox modelValue={checkboxValNumber} onInput={setCheckboxValNumber} value={2}>number value 2</MCheckbox>
  </div>;


  const progress = <div className="progress">
    <MProgress value={20}></MProgress>
  </div>;


  const radio = <div className="radio">
    <MRadio name="hi"></MRadio>
    <MRadio label="label" name="hi"></MRadio>
    <MRadio label="label" name="hi">replace by label</MRadio>
  </div>

  const [switchVal, setSwitchVal] = useState(true);
  const switchDom = <div className="switch">
    <MSwitch value={switchVal}></MSwitch>
    <MSwitch value={switchVal} loading></MSwitch>
    <MSwitch value={switchVal} disabled></MSwitch>
  </div>

  const tagDom = <div className="tag">
    <MTag>hi</MTag>
    <MTag type="primary">primary</MTag>
    <MTag type="error">error</MTag>
    <MTag type="confirm">confirm</MTag>
    <MTag type="warning">warning</MTag>
  </div>


  return <div className="flex">
    {tagDom}
    {switchDom}
    {radio}
    {progress}
    {checkbox}
    {input}
    {button}
  </div>;
}
