/**
 * @description react version MTag
 * @author 阿怪
 * @date 2023/3/1 01:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/tag/tag.css';
import { TagProps } from '@shuimo-design/core/lib/base/tag';
import { Slot } from '../../types';

export default function MTag(props: TagProps & Slot) {

  return <div className={['m-tag', `m-tag-${props.type ?? 'default'}`].join(' ')}>
    <div className="m-tag-left"/>
    <div className="m-tag-main">
      {props.children}
    </div>
    <div className="m-tag-right"/>
  </div>;
}
