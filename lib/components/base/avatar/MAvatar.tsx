/**
 * @description vue version avatar
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { type AvatarProps } from '@shuimo-design/ui-core/types/index';
import { AvatarCore } from '@shuimo-design/ui-core';
import MAvatarSvg from './MAvatarSvg.tsx';
import './avatar.css';

const { props, useAvatar } = AvatarCore;

export default defineComponent((_props: AvatarProps) => {
  const { renderInit, props } = useAvatar(_props);
  return () => {
    const { avatarClass, img } = renderInit();
    return <div class={avatarClass}>
      {img}
      <MAvatarSvg variant={props.variant}/>
    </div>;
  };
}, {
  name: 'MAvatar',
  props,
});
