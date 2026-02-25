/**
 * @description breadcrumb 运行时 props
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../../types/props';
import { BreadcrumbProps } from './props';

export const props: MCOPO<BreadcrumbProps> = {
  separator: { type: String, default: '/' },
  items: { type: Array, default: () => [] },
};
