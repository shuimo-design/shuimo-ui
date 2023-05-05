/**
 * @description react version MPopover
 * @author 阿怪
 * @date 2023/2/21 09:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';
import { PopoverProps } from '@shuimo-design/core/lib/message/popover';
import { Slot } from '../../types';
import { PopoverImpl, usePopover } from '@shuimo-design/core/lib/message/popover/usePopover';
import { props as popoverProps } from '@shuimo-design/core/lib/message/popover/api';
import '@shuimo-design/core/lib/message/popover/popover.css';
import { getSlot, withDefault } from '../../base/tools';

export default function MPopover(baseProps: PopoverProps & Slot) {
  const props = withDefault(baseProps, popoverProps);
  const { createPopover, getContent } = usePopover();

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

  const [style, setStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    setStyle(popperInstance?.style || {});
  }, [popperInstance?.visible]);

  const handleClick = async () => {
    popperInstance?.toggle();
    // todo need help... this way to set style is shit..
    const _style = await popperInstance?.popperInstance.getPositionStyle();
    setStyle(_style as React.CSSProperties || {});
  };


  return <div className="m-popover">
    <div className="m-popover-default-wrapper"
         ref={popoverRef}
         onClick={() => handleClick()}>
      {active}
    </div>
    <MPopoverContent ref={contentRef} style={style} content={content}/>
  </div>;

}

const MPopoverContent = forwardRef(function MPopoverContent(
  props: { style: React.CSSProperties, content: React.ReactNode },
  ref: ForwardedRef<HTMLDivElement>
) {
  return <div className="m-popover-content" ref={ref} style={props.style}>
    {props.content}
  </div>;
});

