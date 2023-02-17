/**
 * @description react version MInput
 * @author 阿怪
 * @date 2023/2/13 02:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { InputEvents, InputProps, useInput } from '@shuimo-design/core';
import { useState } from 'react';
import { cr } from '../../tools/coreRender';


export default function MInput(props: InputProps & InputEvents) {
  const { getTemplate } = useInput();

  const [value, setValue] = useState(props.value);

  return cr(getTemplate({
    props: {
      ...props,
      value
    },
    events: {
      onInput: (e: any) => {
        setValue(e.target.value);
        props.onInput && props.onInput(e.target.value);
      }
    }
  }));
}
