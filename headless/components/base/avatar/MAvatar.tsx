/**
 * @description
 * @author 阿怪
 * @date 2024/10/9 00:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { type AvatarProps } from '@shuimo-design/ui-core/types/index';
import { AvatarCore } from '@shuimo-design/ui-core';
import './avatar.css';

const { props, useAvatar } = AvatarCore;

export default defineComponent((_props: AvatarProps) => {
  const { renderInit } = useAvatar(_props);
  return () => {
    const { avatarClass, img } = renderInit();
    return <div class={avatarClass}>
      {img}
    </div>;
  };
}, {
  name: 'MAvatar',
  props,
});
