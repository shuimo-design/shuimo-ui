/**
 * @description vue version avatar
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from './api.ts';
import './avatar.css';
import MAvatarSvg from './MAvatarSvg.tsx';
import { AvatarProps } from './index';

export default defineComponent((_props: AvatarProps) => {
  const props = _props as Required<AvatarProps>;
  return () => {
    return <div class={['m-avatar', `m-avatar-${props.variant}`, `m-avatar-${props.size}`]}>
      <img src={props.img} alt=""/>
      <MAvatarSvg variant={props.variant}/>
    </div>;
  };
}, {
  name: 'MAvatar',
  props,
});
