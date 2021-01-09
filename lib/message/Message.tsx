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
  time?: number
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


export default function message(config: MessageConfig) {

  const parent = setMessageDiv();
  const div = document.createElement('div');
  parent.append(div);

  const currentConfig = {
    time: 3000,
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
            <span>{currentConfig.content}</span>
          </div> : null
        );
      }
    }).mount(div);
  }

  render(currentConfig);
}
