/**
 * @description confirm api
 * @author 阿怪
 * @date 2023/05/10 20:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { ConfirmProps } from './index';

export const props: MCOPO<ConfirmProps> = {
  mask: { type: Object, default: { show: true, clickClose: true } },
  teleport: { type: Object, default: { to: 'body' } },
  content: { type: String, default: '' }
};
