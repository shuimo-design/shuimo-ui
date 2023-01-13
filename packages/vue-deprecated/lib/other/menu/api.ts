/**
 * @description menu api
 * @author 阿怪
 * @date 2022/4/17 00:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO, WPropType } from '../../dependents/_types';
import { MenuTypeArr } from '../../../types/components/components';
import { MenuProps } from './index';

export const props: WCOPO<MenuProps> = {
  menu: { type: Array as WPropType<MenuTypeArr>, default: () => [] }
};
