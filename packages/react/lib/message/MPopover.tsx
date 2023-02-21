/**
 * @description react version MPopover
 * @author 阿怪
 * @date 2023/2/21 09:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { PopoverProps, usePopover } from '@shuimo-design/core';
import { Slot } from '../types';
import { cr } from '../../tools/coreRender';
import { useRef } from 'react';


export default function MPopover(props: PopoverProps & Slot) {
  const { getTemplate } = usePopover();

  const popoverRef = useRef<HTMLElement>();
  const contentRef = useRef<HTMLElement>();

  return cr(getTemplate({
    ref: { popoverRef, contentRef }
  }), props);
}
