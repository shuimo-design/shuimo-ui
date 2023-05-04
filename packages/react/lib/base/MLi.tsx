/**
 * @description react version li
 * @author 阿怪
 * @date 2023/05/04 17:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/li/li.css';
import { LiProps } from '@shuimo-design/core/lib/base/li';
import { Slot } from '../../types';
import { clsx } from '@shuimo-design/tools/index';

export default function MLi(props: LiProps & Slot) {
  return <li className={clsx(['m-li', { 'm-li-active': props.active }])}>
    {props.children}
  </li>;
}

