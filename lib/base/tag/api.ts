/**
 * @description
 * @author 阿怪
 * @date 2022/8/11 01:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { TagProps } from './index';

export const props: WCOPO<TagProps> = {
  type: { type: String, default: 'default' }
};
