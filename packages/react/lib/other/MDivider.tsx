/**
 * @description react version MDivider
 * @author 阿怪
 * @date 2023/3/1 22:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import { DividerProps } from '@shuimo-design/core/lib/other/divider';
import '@shuimo-design/core/lib/other/divider/divider.css';


export default function MDivider(props: DividerProps) {
  return <div className={['m-divider', props.vertical ? 'm-divider-vertical' : ''].join(' ')}/>;
}
