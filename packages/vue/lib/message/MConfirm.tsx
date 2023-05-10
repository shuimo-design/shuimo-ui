/**
 * @description vue version confirm
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createApp, h, VNode } from 'vue';
import { props } from '@shuimo-design/core/lib/message/confirm/api';
import useModel from '../../composition/useModel';
import { IConfirm } from '@shuimo-design/core/lib/message/confirm';
import { notEmpty } from '@shuimo-design/tools/empty';
import MButton from '../base/MButton';
import MBorder from '../template/MBorder';

const Confirm: IConfirm = async config => {
  let confirmDiv: Element | undefined = undefined;
  const removeDiv = () => {
    confirmDiv?.remove();
  };

  const _content = typeof config==='string' ? config : config.content;

  return new Promise(resolve => {
    const bodyDomList = document.getElementsByTagName('body');
    if (notEmpty(bodyDomList)) {
      confirmDiv = document.createElement('div');
      const confirmVNode = h({
        name: 'MConfirm',
        props,
        setup: (props, { emit, slots }) => {
          const confirm = () => {
            removeDiv();
            resolve(true);
          };

          const cancel = () => {
            removeDiv();
            resolve(false);
          };

          const {
            getModel,
            handleModelClickPropagation
            // todo fix any
          } = useModel({ ...(props as any), teleport: { to: confirmDiv }, visible: true }, { emit });

          const confirmBtn = h(MButton, { text: '确定', type: 'primary', onClick: confirm });
          const cancelBtn = h(MButton, { text: '取消', onClick: cancel });

          const withBorder = (slot: VNode, appendClass?: string) => h(MBorder, {
            class: appendClass
          }, () => slot);

          return () => {
            const getConfirm = () => {
              return getModel(withBorder(<div onClick={handleModelClickPropagation}>
                <div class="m-confirm-inner">
                  <span>{props.content}</span>
                  <div class="m-confirm-button">
                    {confirmBtn}
                    {cancelBtn}
                  </div>
                </div>

              </div>, 'm-confirm'));
            };

            return getConfirm();
          };
        }
      });


      createApp(confirmVNode, { content: _content }).mount(confirmDiv);

      bodyDomList[0].appendChild(confirmDiv);
    }

  });

};

export default Confirm;
