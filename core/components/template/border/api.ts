/**
 * @description border api
 * @author 阿怪
 * @date 2024/3/19 11:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '../../../../lib/components/types/props';
import { BorderProps } from './props';

export const props: MCOPO<BorderProps> = {
  border: { type: [Boolean, Object] as MPropType<boolean | { top?: boolean, right?: boolean, bottom?: boolean, left?: boolean }>, default: true },
  top: { type: [Boolean, String], default: undefined },
  right: { type: [Boolean, String], default: undefined },
  bottom: { type: [Boolean, String], default: undefined },
  left: { type: [Boolean, String], default: undefined },
  mask: { type: Boolean, default: true },
  insteadMain: { type: [Boolean, String], default: false },
};
