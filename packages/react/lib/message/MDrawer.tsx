/**
 * @description react version drawer
 * @author 阿怪
 * @date 2023/05/08 00:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/message/drawer/drawer.css';
import { DrawerProps } from '@shuimo-design/core/lib/message/drawer';
import { Slot } from '../../types';
import { getSlot, withDefault } from '../../base/tools';
import { props as drawerProps } from '@shuimo-design/core/lib/message/drawer/api';
import useModel from '../../base/useModel';
import { MBorder } from '../../index';

export default function MDrawer(baseProps: DrawerProps & Slot) {

  const props = withDefault(baseProps, drawerProps);
  const [active, drawer] = getSlot(props, 'active');


  const {
    visible,
    getModel,
    getModelActive,
    handleModelClickPropagation,
    getClose
  } = useModel(props);


  const getActive = () => {
    return getModelActive(active);
  };

  const getDrawer = () => {
    return getModel(<div className="m-drawer" onClick={handleModelClickPropagation}>
      {React.createElement(MBorder, {}, drawer)}
    </div>);
  };

  return <div className="m-drawer-wrapper">
    {getActive()}
    {visible ? getDrawer() : ''}
  </div>;
}

