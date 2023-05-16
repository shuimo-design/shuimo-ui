/**
 * @description react version MPopover
 * @author 阿怪
 * @date 2023/2/21 09:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import React, { useEffect, useRef, useState } from 'react';
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';
import { Slot } from '../../types';
import { PopoverImpl, usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';
import { props as popoverProps } from '@shuimo-design/core/lib/message/popover/api';
import '@shuimo-design/core/lib/message/popover/popover.css';
import { getSlot, withDefault } from '../../base/tools';
import useTeleport from '../../base/useTeleport';

export default function MPopover(baseProps: PopoverProps & Slot) {
  const props = withDefault(baseProps, popoverProps);

  const styleState = useState({});
  const { createPopover, getContent } = usePopover({ style: styleState, props });

  const popoverRef = useRef(null);
  const contentRef = useRef(null);


  const [content, active] = getSlot(props, 'content');

  const [popperInstance, setPopperInstance] = useState<PopoverImpl | null>(null);

  useEffect(() => {
    setPopperInstance(createPopover(popoverRef.current!, contentRef.current!, {
      ...props.popper,
      placement: props.placement
    }));
  }, [popoverRef, contentRef]);

  const handleClick = async () => {
    popperInstance?.toggle();
  };


  return <div className="m-popover">
    <div className="m-popover-default-wrapper"
         ref={popoverRef}
         onClick={() => handleClick()}>
      {active}
    </div>
    <div className="m-popover-content" ref={contentRef} style={styleState[0]}>
      {getContent(props, () => content, useTeleport, popperInstance)}
    </div>
  </div>;
}

