/**
 * @description empty api
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { EmptyProps } from './props';

export const props: MCOPO<EmptyProps> = {
  description: { type: String, default: '暂无数据' },
  image: { type: String, default: undefined },
};
