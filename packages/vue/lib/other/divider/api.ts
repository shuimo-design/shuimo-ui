/**
 * @description
 * @author 阿怪
 * @date 2022/5/2 09:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { DividerType } from './index';

export const props: WCOPO<DividerType> = {
  vertical: { type: Boolean, default: false }
};
