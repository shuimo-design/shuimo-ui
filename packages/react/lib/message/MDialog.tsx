/**
 * @description react version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { ReactNode, useState } from 'react';
import { Slot } from '../../types';
import { DialogProps } from '@shuimo-design/core/lib/message/dialog';
import { props as dialogProps } from '@shuimo-design/core/lib/message/dialog/api';
import '@shuimo-design/core/lib/message/dialog/dialog.css';
import { getSlot, withDefault } from '../../base/tools';

export default function MDialog(baseProps: DialogProps & Slot) {
  const props = withDefault(baseProps, dialogProps);
  const [visible, setVisible] = useState(props.visible);


  const [active, dialog] = getSlot(props, 'active');

  const handleClick = () => {
    setVisible(!visible);
  };
  const closeDialog = () => {
    setVisible(false);
  };

  const getCloseDialog = () => {
    return <div onClick={() => closeDialog()} className="m-dialog-close-btn m-cursor-pointer"/>;
  };
  const getActive = () => {
    return <div className="m-dialog-active" onClick={() => handleClick()}>
      {active}
    </div>;
  };

  const getDialog = () => {
    return <div className={['m-dialog-mask', props.mask.show ? 'm-dialog-mask-bg' : ''].join(' ')}>
      <div className="m-dialog">
        {getCloseDialog()}
        {dialog}
      </div>
    </div>;
  };

  return <div className="m-dialog-wrapper">
    {getActive()}
    {visible ? getDialog() : ''}
  </div>;
}
