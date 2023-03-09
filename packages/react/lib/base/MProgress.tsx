/**
 * @description react version progress
 * @author 阿怪
 * @date 2023/03/09 16:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useProgress, ProgressProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';

export default function MProgress(props: ProgressProps & Slot ) {
  const { getTemplate } = useProgress();

  return cr(getTemplate({ props }),props)
}

