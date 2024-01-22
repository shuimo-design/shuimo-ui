/**
 * @description core confirm hook
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo use Options type?
 */
import { notEmpty } from '../../../tools';
import { IConfirm } from './index';

export function useConfirm(
  appendToBody: (
    data: {
      bodyDom: Element,
      confirmDiv: Element,
      _content: string,
      confirm: () => void,
      cancel: () => void,
    }
  ) => void
) {

  const ConfirmImpl: IConfirm = async config => {
    let confirmDiv: Element | undefined = undefined;
    const removeDiv = () => {
      confirmDiv?.remove();
    };
    const _content = typeof config === 'string' ? config : config.content ?? '';
    return new Promise((resolve, reject) => {

      const confirm = () => {
        removeDiv();
        resolve(true);
      };

      const cancel = () => {
        removeDiv();
        resolve(false);
      };

      const bodyDomList = document.getElementsByTagName('body');
      if (notEmpty(bodyDomList)) {
        confirmDiv = document.createElement('div');
        const bodyDom = bodyDomList[0];
        appendToBody({ bodyDom, confirmDiv, _content, confirm, cancel });
      } else {
        reject('body dom not found');
      }

    });
  };

  return {
    ConfirmImpl
  };

}
