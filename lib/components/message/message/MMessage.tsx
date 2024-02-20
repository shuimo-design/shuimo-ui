/**
 * @description message插件式组件
 * @author: qunbotop
 * @date 2022/5/16 4:37 下午
 * @version v3.0.0
 *
 * v2.0.1 message handler 提供返回
 * v3.0.0 refactor 阿怪
 *
 * todo support mouse hover handle
 */
import { Component, ComponentPublicInstance, createApp, nextTick } from 'vue';
import MMessageList from './MMessageList';
import MMessageItem from './MMessageItem';
import { useMessage } from './useMessage.ts';
import { MessageIns } from './index';
import './message.css';

type VueMessageIns = MessageIns<Component<typeof MMessageItem>> & ComponentPublicInstance;

const { initMessage } = useMessage<Component<typeof MMessageItem>>();

const MMessage = initMessage({
  getIns: direction => {
    const wrapper = document.createElement('div');
    return createApp(MMessageList, { direction }).mount(wrapper) as VueMessageIns;
  },
  nextTick: async (resolve, messageListIns) => {
    await nextTick(() => {
      const { domList } = messageListIns;
      const dom = domList[domList.length - 1];
      resolve(dom);
    });
  },
});

export default MMessage;
