/**
 * @description react version messageList
 * @author 阿怪
 * @date 2023/5/24 10:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MessageListProps } from '@shuimo-design/core/lib/message/message';
import React, { createElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MessageOptions, useMessageList } from '@shuimo-design/core/lib/message/message/useMessageList';
import MMessageItem from './MMessageItem';
import { clsx } from '@shuimo-design/tools/index';
import { createRoot } from 'react-dom/client';


const MMessageListWrapper = forwardRef(
  function MMessageListWrapper(props: MessageListProps & { resolveRef: () => void }, ref) {
    console.log('render');
    const currentRef = useRef<HTMLDivElement | null>(null);
    const messageListState = useState<MessageOptions[]>([]);
    const messageDomIdRef = useRef<string[]>([]);


    const { baseClass, add, remove, getKey } = useMessageList({
      props,
      value: {
        messageListRef: messageListState
      }
    });
    const domState = useState([]);

    useEffect(() => {
      props.resolveRef();
    }, []);


    const removeItem = (id: string) => {
      const index = messageDomIdRef.current.indexOf(id);
      if (index < 0) {
        return;
      }
      messageDomIdRef.current.splice(index, 1);
      const child = currentRef.current?.children[index];
      if (child) {
        currentRef.current?.removeChild(child);
      }
    };

    // hack func, use createElement... need help...
    const addItem = (item: MessageOptions) => {
      const id = getKey();
      const msg = createElement(() => <MMessageItem key={id} {...item} onCloseDuration={() => removeItem(id)}/>);
      const div = document.createElement('div');
      const root = createRoot(div);
      root.render(msg);
      currentRef.current!.appendChild(div);
      messageDomIdRef.current.push(id);
    };


    useImperativeHandle(ref, () => ({
      add: addItem,
      messageList: messageListState,
      domList: domState
    }), [currentRef]);


    return <div className={clsx(baseClass)} ref={currentRef}>
    </div>;
  }
);


export default MMessageListWrapper;


