/**
 * @description react version MPopover
 * @author 阿怪
 * @date 2023/2/21 09:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import React, { useRef } from 'react';
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';
import { Slot } from '../../types';
import { usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';
import '@shuimo-design/core/lib/message/popover/popover.css';
import { getSlot } from '../../base/tools';

export default function MPopover(props: PopoverProps & Slot) {
  const { init, trigger } = usePopover();

  const popoverRef = useRef(null);
  const contentRef = useRef(null);


  const [content, active] = getSlot(props, 'content');

  let isFirstClick = false;
  const handleClick = () => {
    if (!isFirstClick) {
      isFirstClick = true;
      init(popoverRef.current!, contentRef.current!);
    }
    trigger();
  };

  return <div className="m-popover">
    <div className="m-popover-default-wrapper"
         ref={popoverRef}
         onClick={() => handleClick()}>
      {active}
    </div>
    <div className="m-popover-content" ref={contentRef}>
      {content}
    </div>
  </div>;


}
