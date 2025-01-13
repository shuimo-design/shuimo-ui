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

const props = AvatarCore.props;

export default defineComponent((_props: AvatarProps) => {
  const props = _props as Required<AvatarProps>;
  return () => {
    return <div class={['m-avatar', `m-avatar-${props.variant}`, `m-avatar-${props.size}`]}>
      <img src={props.img} alt=""/>
    </div>;
  };
}, {
  name: 'MAvatar',
  props,
});
