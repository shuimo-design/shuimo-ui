/**
 * @description react version avatar
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/base/avatar/avatar.css';
import { AvatarProps } from '@shuimo-design/core/lib/base/avatar';
import { props as avatarProps } from '@shuimo-design/core/lib/base/avatar/api';
import { clsx } from '@shuimo-design/tools/index';
import { withDefault } from '../../base/tools';

export default function MAvatar(baseProps: AvatarProps) {
  const props = withDefault(baseProps, avatarProps);
  return <div className={clsx(['m-avatar', `m-avatar-${props.variant}`, `m-avatar-${props.size}`])}>
    <img src={props.img} alt=""/>
    <div className="m-avatar-mask"></div>
  </div>;
}

