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
import MButton from '../base/MButton';
import MBorder from '../template/border/MBorder';
import { useConfirm } from '@shuimo-design/core/lib/message/confirm/useConfirm';

const Confirm: IConfirm = async config => {
  const { ConfirmImpl } = useConfirm((options) => {
    const { confirmDiv, _content, confirm,cancel, bodyDom } = options;

    const confirmVNode = h({
      name: 'MConfirm',
      props,
      setup: (props, { emit, slots }) => {


        const {
          getModel,
          handleModelClickPropagation,
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

    bodyDom.appendChild(confirmDiv);
  });
  return ConfirmImpl(config);
};

export default Confirm;
