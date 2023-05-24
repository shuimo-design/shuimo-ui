/**
 * @description react version message
 * @author 阿怪
 * @date 2023/05/22 16:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { createElement, createRef, RefObject, useRef } from 'react';
import '@shuimo-design/core/lib/message/message/message.css';
import { useMessage } from '@shuimo-design/core/lib/message/message/useMessage';
import MMessageList from './MMessageList';
import { createRoot } from 'react-dom/client';
import { MessageIns } from '@shuimo-design/core/lib/message/message';
import MMessageItem from './MMessageItem';

type ReactMessageIns = MessageIns<typeof MMessageItem>;

const { initMessage } = useMessage();

export default initMessage({
  getIns: async direction => {
    const initMessageList = () => {
      return new Promise<RefObject<ReactMessageIns>>((resolve) => {
        const ref = createRef<ReactMessageIns>();
        const dom = <MMessageList direction={direction} ref={ref} resolveRef={() => resolve(ref)}/>;
        const wrapper = document.createElement('div');
        wrapper.classList.add('m-message-wrapper');
        createRoot(wrapper).render(dom);
        document.body.append(wrapper);
      });
    };
    const ref = await initMessageList();
    return ref.current as ReactMessageIns;
  },
  nextTick: async (resolve, messageListIns) => {
    resolve(undefined);
  }
});


