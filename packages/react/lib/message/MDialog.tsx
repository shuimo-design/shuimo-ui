/**
 * @description react version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo support teleport
 */
import React, { useState } from 'react';
import { Slot } from '../../types';
import { DialogProps } from '@shuimo-design/core/lib/message/dialog';
import { props as dialogProps } from '@shuimo-design/core/lib/message/dialog/api';
import '@shuimo-design/core/lib/message/dialog/dialog.css';
import { getSlot, withDefault } from '../../base/tools';
import useModel from '../../base/useModel';

export default function MDialog(baseProps: DialogProps & Slot) {
  const props = withDefault(baseProps, dialogProps);

  const {
    visible,
    getModel,
    getModelActive,
    handleModelClickPropagation,
    getClose
  } = useModel(props);

  const [active, dialog] = getSlot(props, 'active');

  const getActive = () => {
    return getModelActive(active);
  };



  const getDialog = () => {
    return getModel(<div className="m-dialog" onClick={handleModelClickPropagation}>
      {props.closeBtn ? getClose() : null}
      {dialog}
    </div>)
  };

  return <div className="m-dialog-wrapper">
    {getActive()}
    {visible ? getDialog() : ''}
  </div>;
}
