/**
 * @description message消息组件
 * @author: 菩萨蛮
 * @date 2021/1/8 4:37 下午
 * @version V1.1.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * V1.0.0 第一版非常粗暴的message消息组件
 * V1.1.0 添加类型定义
 * V1.1.1 类型定义优化
 */
import { h, createApp } from 'vue';
import { BaseMessageConfig, MessageConfig, IMessage } from "../../../types/components/WMessage";

enum MessageEnum {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

const setMessageDiv = () => {
  const domList = document.getElementById('message–div');
  if (domList && Array(domList).length > 0) {
    return domList;
  }
  const div = document.createElement('div');

  div.id = 'message–div';
  document.body.appendChild(div);
  return div;
};

const Message = (config: BaseMessageConfig) => {

  const parent = setMessageDiv();
  const div = document.createElement('div');
  div.id = 'w-messages';
  parent.append(div);

  const currentConfig = {
    time: 3000,
    type: 'success',
    ...config
  };
  let confirmDialogProps = {};


  function render(props: any) {
    confirmDialogProps = props;
    return createApp({
      data() {
        return {
          _timer: null,
          visible: true
        };
      },
      mounted() {
        this._timer = setTimeout(() => {
          div.remove();
        }, currentConfig.time);
      },
      render() {
        return (
          this.visible ? <div class="w-message-div">
            <div class={[currentConfig.type, 'icon']}/>
            <span class="w-message-content">{currentConfig.content}</span>
          </div> : null
        );
      }
    }).mount(div);
  }

  render(currentConfig);
}

for (let type of Object.values(MessageEnum)) {
  (Message as IMessage)[type] = (options: MessageConfig) => {
    if (typeof options === 'string') {
      options = {
        content: options
      };
    }
    options.type = type;
    return Message(options);
  };
}

export default Message;
