/**
 * @description confirm api type
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * @name m-confirm
 * @docDescription confirm component with shuimo-ui style.
 * @docUrl https://shuimo.design/confirm,
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ModelMask } from '../../../types/common/model';
import { MTeleportProps } from '../../../types/common/common';

export declare type ConfirmProps = {
  /**
   * @description confirm mask option
   *              确认框背景配置
   * @type ModelMask
   * @default show:true, clickClose:true
   */
  mask?: ModelMask,
  /**
   * @description confirm teleport
   *              确认框传送
   * @type teleport props
   * @default ''
   */
  teleport?: MTeleportProps,
  /**
   * @description confirm content
   *              确认框内容
   * @type string
   * @default ''
   */
  content?: string,
};

export type IConfirm = {
  (config: ConfirmProps | string): Promise<boolean>
};

