/**
 * @description breadcrumb and breadcrumbItem api
 * @author youus
 * @date 2023/12/19 23:15
 * @version v1.0.0
 *
 * Hello, humor
 */

import { MCOPO } from '@shuimo-design/types';
import type { BreadcrumbItemProps, BreadcrumbProps } from './breadcrumb';

export const props: MCOPO<BreadcrumbProps> = {
  separator: { type: String, default: '' },
  options: { type: Array, default: () => [] }
}

export const breadcrumbItemProps: MCOPO<BreadcrumbItemProps> = {
  content: { type: String, default: '' }
}
