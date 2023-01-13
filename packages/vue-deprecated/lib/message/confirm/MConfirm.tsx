/**
 * @description confirm 确认组件
 * @author 阿怪
 * @date 2021/9/24 1:11 上午
 * @version v0.0.1-beta
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { createApp, h } from 'vue';
import MBorder from '../../other/border/MBorder';
import MButton from '../../base/button/MButton';
import { notEmpty } from '../../dependents/_utils/tools';
import { BaseConfirmConfig, IConfirm } from '../../../types/components/MConfirm';

let confirmDiv: Element | undefined;

const removeDiv = () => {
  confirmDiv?.remove();
};

const render: (config: BaseConfirmConfig) => Promise<boolean> = config => {
  return new Promise(resolve => {
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
          const confirmBtn = h(MButton, { text: '确定', type: 'primary', onClick: ctx.confirm });
          const cancelBtn = h(MButton, { text: '取消', onClick: ctx.cancel });
          return (
            <div class="mask mask-bg">
              <div class="m-confirm">
                <MBorder>
                  <div class="m-confirm_inner">
                    <span>{config.content}</span>

                    <div class="m-confirm-button">
                      {confirmBtn}
                      {cancelBtn}
                    </div>
                  </div>
                </MBorder>
              </div>
            </div>
          );
        }
      }).mount(confirmDiv);
    }
  });
};

const Confirm: IConfirm = async config => {
  let c = config;
  if (typeof config === 'string') {
    c = { content: config };
  }
  return render(c as BaseConfirmConfig);
};

export default Confirm;
