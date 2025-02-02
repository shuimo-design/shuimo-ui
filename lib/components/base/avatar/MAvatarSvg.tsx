/**
 * @description
 * @author 阿怪
 * @date 2024/2/29 15:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, defineComponent } from 'vue';
import { AvatarCore } from '@shuimo-design/ui-core';
import { type AvatarProps } from '@shuimo-design/ui-core/types/index';
import useSvgInject from '../../../compositions/common/useSvgInject.ts';
import { AVATAR_CIRCLE_ID, AVATAR_SQUARE_ID } from '../../other/svg/MSvgSymbol.tsx';

type SvgInfoType = { viewBox: string; id: string };
const avatarSvgInfo: Record<keyof AvatarProps['variant'], SvgInfoType> = {
  circle: { viewBox: '0 0 837.14 743.36', id: AVATAR_CIRCLE_ID },
  square: { viewBox: '0 0 832.79 828.92', id: AVATAR_SQUARE_ID },
};

const { props } = AvatarCore;

export default defineComponent((props: Pick<AvatarProps, 'variant'>) => {
  const {
    svgUrl,
    installIconSvg,
    isAuto,
  } = useSvgInject(computed(() => props.variant === 'circle' ? AVATAR_CIRCLE_ID : AVATAR_SQUARE_ID));
  if (isAuto.value) {
    installIconSvg();
  }
  const info = avatarSvgInfo[props.variant as keyof AvatarProps['variant']] as SvgInfoType;

  return () => {
    return <svg class="m-avatar-mask" xmlns="http://www.w3.org/2000/svg" viewBox={info.viewBox}>
      <use href={svgUrl}/>
    </svg>;
  };
}, {
  name: 'MAvatarSvg',
  props: {
    variant: props.variant,
  },
});
