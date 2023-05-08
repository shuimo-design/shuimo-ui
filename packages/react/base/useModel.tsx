/**
 * @description react model hook,dialog or drawer are special dialog,so we use this hook to handle it
 * @author 阿怪
 * @date 2023/5/8 21:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ModelMask } from '@shuimo-design/core/types/common/model';
import { MTeleportProps } from '@shuimo-design/core/types/common/common';
import React, { useState } from 'react';
import useMask from './useMask';
import useTeleport from './useTeleport';


export default function useModel(props: {
  visible: boolean,
  mask: ModelMask,
  teleport: MTeleportProps
}) {
  const [visible, setVisible] = useState(props.visible);
  const handleClick = () => {
    setVisible(!visible);
  };
  const closeModel = () => {
    setVisible(false);
  };

  const getClose = () => {
    return <div onClick={(e) => {
      closeModel();
      e.stopPropagation();
    }} className="m-model-close-btn m-cursor-pointer"/>;
  };

  const { wrapperWithMask } = useMask(props, handleClick);


  const getModelActive = (dom?: React.ReactNode) => {
    return <div className="m-model-active" onClick={handleClick}>
      {dom}
    </div>;
  };

  const handleModelClickPropagation = (e: React.MouseEvent) => {e.stopPropagation();};

  const getModel = (dom:React.ReactNode)=>{
    return useTeleport({
      teleportProps: { to: props.teleport.to },
      slot: wrapperWithMask(dom)
    })
  }

  return {
    visible,setVisible,
    handleClick,
    getModel,
    closeModel,
    handleModelClickPropagation,
    getClose,
    getModelActive
  };

}
