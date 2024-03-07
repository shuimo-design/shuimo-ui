/**
 * @description
 * @author 阿怪
 * @date 2024/2/29 15:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, inject } from 'vue';
import { AVATAR_CIRCLE_ID, AVATAR_SQUARE_ID } from '../../other/svg/MSvgSymbol.tsx';
import { MUIOption } from '../../../types/shuimo-ui';
import { MShuimoConfigKey } from '../../other/config/MShuimoConfig.tsx';
import { AvatarProps } from './index';
import { props } from './api.ts';

type SvgInfoType = { viewBox: string; id: string };
const avatarSvgInfo: Record<keyof AvatarProps['variant'], SvgInfoType> = {
  circle: { viewBox: '0 0 837.14 743.36', id: AVATAR_CIRCLE_ID },
  square: { viewBox: '0 0 832.79 828.92', id: AVATAR_SQUARE_ID },
};

export default defineComponent((props: Pick<AvatarProps, 'variant'>) => {
  const shuimoConfig = inject<MUIOption>(MShuimoConfigKey, { svgInject: 'auto' });
  const isNuxt = shuimoConfig?.svgInject === 'nuxt';
  const info = avatarSvgInfo[props.variant as keyof AvatarProps['variant']] as SvgInfoType;

  const svgUrl = `${isNuxt ? 'm-shuimo/icon/icon.svg' : ''}#${info.id}`;
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
