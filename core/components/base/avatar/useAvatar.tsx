/**
 * @description avatar component core hook
 * @author 阿怪
 * @date 2025/1/14 09:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { AvatarProps } from './props';

export default function useAvatar(_props: AvatarProps) {
  const props = _props as Required<AvatarProps>;

  const renderInit = () => {
    const avatarClass = ['m-avatar', `m-avatar-${_props.variant}`, `m-avatar-${_props.size}`];
    const img = <img src={props.img} alt=""/>;

    return {
      avatarClass,
      img,
    };
  };

  return {
    renderInit,
    props,
  };
}
