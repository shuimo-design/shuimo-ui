/**
 * @description react version message item
 * @author 阿怪
 * @date 2023/5/24 10:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MessageProps } from '@shuimo-design/core/lib/message/message';
import React, { useEffect, useState } from 'react';
import { messageIcon, useMessageItem } from '@shuimo-design/core/lib/message/message/useMessageItem';
import { withDefault } from '../../../base/tools';
import { props as messageItemProps } from '@shuimo-design/core/lib/message/message/api';


type ReactMessageProps = MessageProps & { onCloseDuration: () => void };
export default function MMessageItem(baseProps: ReactMessageProps) {
  console.log('item render');
  const props = withDefault(baseProps, messageItemProps);

  const domState = useState<HTMLElement | null>(null);


  const {
    onMountedEvent, setTimer,
    onMouseEnterHandler, onMouseLeaveHandler
  } = useMessageItem({
    props,
    value: { domRef: domState },
    event: {
      closeDuration: () => {
        baseProps.onCloseDuration();
      }
    }
  });

  useEffect(() => {
    onMountedEvent();
    setTimer();
  });

  const iconDom = <img className={'m-message-list-icon'} src={`${messageIcon[props.type]}`}/>;
  const contentDom = <div className={'m-message-content'}>{props.content}</div>;


  return <div className="m-message-item" ref={domState[1]}
              onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
    {iconDom}
    {contentDom}
  </div>;
}
