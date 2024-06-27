/**
 * @description border api
 * @author 阿怪
 * @date 2024/3/19 11:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { BorderProps } from './index';

export const props: MCOPO<BorderProps> = {
  top: { type: [Boolean, String], default: true },
  right: { type: [Boolean, String], default: true },
  bottom: { type: [Boolean, String], default: true },
  left: { type: [Boolean, String], default: true },
  insteadMain: { type: [Boolean, String], default: false },
};
