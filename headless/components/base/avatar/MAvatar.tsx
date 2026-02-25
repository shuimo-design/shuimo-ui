/**
 * @description
 * @author 阿怪
 * @date 2024/10/9 00:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { AvatarProps } from '@shuimo-design/ui-core/components/base/avatar/props';
import { AvatarCore } from '@shuimo-design/ui-core';
import './avatar.css';

export default defineComponent((_props: AvatarProps, { slots }) => {
  const props = _props as Required<AvatarProps>;
  return () => {
    // 有图片地址时渲染 img，否则渲染默认插槽内容（如文字头像、图标等）
    const content = props.img
      ? <img src={props.img} alt=""/>
      : slots.default?.();

    return <div class={['m-avatar', `m-avatar-${props.variant}`, `m-avatar-${props.size}`]}>
      {content}
    </div>;
  };
}, {
  name: 'MAvatar',
  props: AvatarCore.props,
});
