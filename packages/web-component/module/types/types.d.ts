/**
 * @description
 * @author 阿怪
 * @date 2022/12/19 01:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '@shuimo-design/core';

type PatchMVNodeTemplate = Partial<Omit<MNodeTemplate, 'children' | 'props'>> & {
  props?: {
    update?: MNodeTemplate['props'],
    remove?: string[]
  },
  children?: Record<string, PatchMVNodeTemplate>,
}
