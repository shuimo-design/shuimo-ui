/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 23:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MPopover, MDialog, MButton, MDrawer, MConfirm, MMessage } from '@shuimo-design/react/index';
import MMessageList from '@shuimo-design/react/lib/message/message/MMessageList';
import { useRef } from 'react';

export default function Message() {

  const popover = <div className="popover">
    <MPopover>
      <MButton>将毛笔移入试试</MButton>
      <div slot="content">
        <div>君不见，黄河之水天上来</div>
      </div>
    </MPopover>
  </div>;

  const dialog = <div className="dialog">
    <MDialog>
      <div slot="active">
        <MButton>点击这里</MButton>
      </div>
      <div>
        <div>君不见，黄河之水天上来</div>
      </div>
    </MDialog>
  </div>;

  const drawer = <div className="drawer">
    <MDrawer>
      <div slot="active">
        <MButton>点击这里</MButton>
      </div>
      <div>
        <div>君不见，黄河之水天上来</div>
      </div>
    </MDrawer>
  </div>;

  const activeConfirm = async () => {
    const res = await MConfirm({ content: '测试文本' });
    console.log(res);
  };

  const confirm = <div className="confirm">
    <MButton onClick={activeConfirm}>测试</MButton>
  </div>;


  const callMessage = () => {
    MMessage.success('success的message', -1);
    MMessage.warning('warning的message');
    MMessage.info('info的message');
    MMessage({ content: 'normal', direction: 'top-right', duration: -1 });
    MMessage({ content: 'normal', direction: 'top-left', duration: -1 });
    MMessage({ content: 'normal', direction: 'top-center', duration: -1 });
    MMessage({ content: 'normal', direction: 'bottom-left', duration: -1 });
    MMessage({ content: 'normal', direction: 'bottom-right', duration: -1 });
  };


  const message = <div className="message">
    <MButton onClick={callMessage}>打开msg</MButton>
  </div>;

  return <div className="flex">
    {message}
    {/*{popover}*/}
    {/*{dialog}*/}
    {/*{drawer}*/}
    {/*{confirm}*/}
  </div>;

}
