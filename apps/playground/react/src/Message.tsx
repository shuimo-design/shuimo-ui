/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 23:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MPopover, MDialog, MButton, MDrawer, MConfirm } from '@shuimo-design/react/index';

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
        <MButton >点击这里</MButton>
      </div>
      <div>
        <div>君不见，黄河之水天上来</div>
      </div>
    </MDialog>
  </div>;

  const drawer = <div className="drawer">
    <MDrawer>
      <div slot="active">
        <MButton >点击这里</MButton>
      </div>
      <div>
        <div>君不见，黄河之水天上来</div>
      </div>
    </MDrawer>
  </div>;

  const activeConfirm =async ()=>{
    const res = await MConfirm({ content: '测试文本' });
    console.log(res);
  }

  const confirm = <div className="confirm">
    <MButton onClick={activeConfirm}>测试</MButton>
  </div>

  return <div className="flex">
    {/*{popover}*/}
    {dialog}
    {drawer}
    {confirm}
  </div>;

}