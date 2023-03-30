/**
 * @description web-component version progress
 * @author 阿怪
 * @date 2023/03/09 16:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createMElement, MElement } from '@shuimo-design/lit';
import { useProgress, ProgressProps } from '@shuimo-design/core';

@createMElement({
  name: 'progress',
  hookFunc: useProgress
})
export default class  extends MElement implements ProgressProps {
  height?: number;
  infoWidth?: number;
  leafHeight?: number;
  max?: number;
  showInfo?: boolean;
  value?: number;
  width?: number;
}
