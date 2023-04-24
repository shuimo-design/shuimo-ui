/**
 * @description react version border component
 * @author 阿怪
 * @date 2023/2/8 23:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { HTMLAttributes } from 'react';
import '@shuimo-design/core/lib/template/border/border.css';
import { Slot } from '../../types';
import { baseLineClass, lineType } from '@shuimo-design/core/lib/template/border/lineType';

export default function MBorder(props: Slot & HTMLAttributes<HTMLDivElement>) {

  const lineTemplate = Object.keys(lineType).map(type => {
    return <div key={type} className={[baseLineClass, `m-border-${type}-line`].join(' ')}></div>;
  });
  return <div {...props} className={['m-border', props.className??''].join(' ')}>
    <div className="m-border-main">
      {props.children ?? null}
    </div>
    {lineTemplate}
  </div>;
}
