/**
 * @description li api
 * @author 阿怪
 * @date 2023/05/04 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../../../lib/components/types/props';
import { LiProps } from './props';

export const props: MCOPO<LiProps> = {
  active: { type: Boolean, default: false },
  icon: { type: Boolean, default: true },
};
