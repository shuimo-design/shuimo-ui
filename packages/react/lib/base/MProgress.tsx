/**
 * @description react version progress
 * @author 阿怪
 * @date 2023/03/09 16:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/progress/progress.css';
import { ProgressProps } from '@shuimo-design/core/lib/base/progress';
import { Slot } from '../../types';
import { getProgressInfo, getProgressWrapperStyle, leaf } from '@shuimo-design/core/lib/base/progress/useProgress';
import { props as progressProps } from '@shuimo-design/core/lib/base/progress/api';
import { withDefault } from '../../base/tools';



export default function MProgress(baseProps: ProgressProps & Slot) {
  const props = withDefault(baseProps, progressProps);
  // todo use effect?
  const progressInfo = getProgressInfo(props);
  // @ts-ignore
  const progress = <progress className="m-progress" value={props.value} max={props.max} style={progressInfo.style}/>;
  if (!props.showInfo) {
    return progress;
  }


  const progressWrapperInfo = getProgressWrapperStyle(props, progressInfo);
  // @ts-ignore
  return <div className="m-progress-border" style={progressWrapperInfo.baseStyle}>
    <div className="m-progress-per" style={progressWrapperInfo.textStyle}>
      <img className="m-progress-leaf" src={leaf.default} alt=""/>
      {props.children}
    </div>
    {progress}
  </div>;
}

