/**
 * @description TaiChi api
 * @author 阿怪
 * @date 2023/4/23 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { TaiChiProps } from './index';

export const props: MCOPO<TaiChiProps> = {
  modelValue: { type: Boolean, required: true },
  value: { type: Boolean, required: true }
};
