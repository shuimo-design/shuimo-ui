/**
 * @description react version confirm
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import '@shuimo-design/core/lib/message/confirm/confirm.css';
import { ConfirmProps, IConfirm } from '@shuimo-design/core/lib/message/confirm';
import { useConfirm } from '@shuimo-design/core/lib/message/confirm/useConfirm';
import useModel from '../../base/useModel';
import MButton from '../base/MButton';
import MBorder from '../template/MBorder';

const Confirm: IConfirm = async config => {
  const { ConfirmImpl } = useConfirm((options) => {
    const { confirmDiv, _content, confirm,cancel, bodyDom } = options;
    const MConfirm: React.FC<ConfirmProps> = props => {
      const {
        getModel,
        handleModelClickPropagation
      } = useModel({ mask: { show: true }, ...props, teleport: { to: confirmDiv }, visible: true });

      const confirmBtn = <MButton type="primary" onClick={confirm}>确定</MButton>;
      const cancelBtn = <MButton onClick={cancel}>取消</MButton>;

      const withBorder = (slot: React.ReactNode, appendClass?: string) => <MBorder className={appendClass}>
        {slot}
      </MBorder>;

      const getConfirm = () => {
        return getModel(<div className="m-confirm">
          {withBorder(<div onClick={handleModelClickPropagation}>
            <div className="m-confirm-inner">
              <span>{_content}</span>
              <div className="m-confirm-button">
                {confirmBtn}
                {cancelBtn}
              </div>
            </div>
          </div>)}
        </div>);
      };

      return getConfirm() as ReactElement;
    };

    const confirmNode = React.createElement(MConfirm);
    createRoot(confirmDiv).render(confirmNode);
    bodyDom.appendChild(confirmDiv);

  });

  return ConfirmImpl(config);
};

export default Confirm;
