/**
 * @description message消息组件
 * @author: 菩萨蛮
 * @date 2021/1/8 4:37 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 *
 * 第一版非常粗暴的message消息组件
 */
import {h, createApp} from 'vue';

export interface MessageConfig {
  content?: string,
  time?: number,
  type?: string
}
export interface ThenableArgument {
  (val: any): void;
}

export interface MessageType {
  (): void;
  then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<void>;
  promise: Promise<void>;
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
}
const Message = (config: MessageConfig) => {

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
            <img src={
              `/lib/assets/message/${currentConfig.type}.png`
            }></img>
            <span class="w-message-content">{currentConfig.content}</span>
          </div> : null
        );
      }
    }).mount(div);
  }

  render(currentConfig);
}

['success', 'info', 'warning'].forEach(type => {
  // @ts-ignore
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        content: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

export default Message;
