/**
 * @description react version MTag
 * @author 阿怪
 * @date 2023/3/1 01:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TagProps, useTag } from '@shuimo-design/core';
import { Slot } from '../types';
import { cr } from '../../tools/coreRender';

export default function MTag(props: TagProps & Slot) {
  const { getTemplate } = useTag();

  return cr(getTemplate({
    props
  }),props)
}
