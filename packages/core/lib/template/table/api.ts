/**
 * @description table api
 * @author 阿怪
 * @date 2023/4/24 16:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import { TableProps } from './index';


export const props: MCOPO<TableProps> = {
  data: { type: Array, default: () => [] },
  height: { type: String, default: null }
};
