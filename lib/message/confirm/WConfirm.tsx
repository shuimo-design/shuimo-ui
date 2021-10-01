/**
 * @Description: confirm 确认组件
 * @Author: 菩萨蛮
 * @Date: 2021/9/24 1:11 上午
 * @Version v0.0.1-beta
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { h, createApp, Teleport } from 'vue';
import WBorder from "../../other/border/WBorder";
import WButton from "../../base/button/WButton";
import { notEmpty } from "../../dependents/_utils/tools";
import { BaseConfirmConfig, IConfirm } from "../../../types/components/WConfirm";

let confirmDiv: Element | undefined;

const removeDiv = () => {
  confirmDiv?.remove();
}

const render: (config: BaseConfirmConfig) => Promise<boolean> = config => {
  return new Promise((resolve, reject) => {
    const bodyDomList = document.getElementsByTagName('body');
    if (notEmpty(bodyDomList)) {
      const body = bodyDomList[0];
      confirmDiv = document.createElement('div');
      body.appendChild(confirmDiv);
      createApp({
        methods: {
          confirm() {
            removeDiv();
            resolve(true);
          },
          cancel() {
            removeDiv();
            resolve(false);
          }
        },
        render(ctx: any) {
          return (
            <div class="mask mask-bg">
              <div class="w-confirm">
                <WBorder>
                  <div class="w-confirm_inner">
                    <span>{config.content}</span>

                    <div class="w-confirm-button">
                      <WButton text='确定' onClick={ctx.confirm}/>
                      <WButton type='gray' text='取消' onClick={ctx.cancel}/>
                    </div>

                  </div>
                </WBorder>
              </div>
            </div>
          )
        }
      }).mount(confirmDiv);
    }
  })
}


const Confirm: IConfirm = async config => {
  let c = config;
  if (typeof config === 'string') {
    c = { content: config }
  }
  return render(c as BaseConfirmConfig);
}


export default Confirm;
