/**
 * @description menu api
 * @author 阿怪
 * @date 2023/08/03 15:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { MenuProps } from './index';
import { props as treeProps } from '../../base/tree/api';
import { DEFAULT_CONFIG } from '../../base/tree/tree';

export const props: MCOPO<MenuProps> = {
  ...treeProps,
  config: {
    type: Object, default: () => ({
      ...DEFAULT_CONFIG,
      expand: 'isActive',
    }),
  },
};
