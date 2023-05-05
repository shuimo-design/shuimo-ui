/**
 * @description dialog api
 * @author 阿怪
 * @date 2023/4/23 11:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { DialogProps } from './index';


export const props: MCOPO<DialogProps> = {
  mask: { type: Object, default: { show: true, clickClose: true } },
  visible: { type: Boolean, default: false },
  closeBtn: { type: Boolean, default: true },
  teleport: { type: Object, default: { to: 'body' } }
};
