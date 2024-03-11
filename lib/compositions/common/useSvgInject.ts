/**
 * @description inject svg hook
 * @author 阿怪
 * @date 2024/3/11 10:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, ComputedRef, createApp, h, inject, isRef, ref } from 'vue';
import { MUIOption } from '../../types/shuimo-ui';
import { MShuimoConfigKey } from '../../components/other/config/MShuimoConfig.tsx';
import MSvgSymbol from '../../components/other/svg/MSvgSymbol.tsx';

// svg_id maybe change?
export default function useSvgInject(_svgId: ComputedRef<string> | string) {
  let svgId = isRef(_svgId) ? _svgId : ref(_svgId);

  const shuimoConfig = inject<MUIOption>(MShuimoConfigKey, { svgInject: 'auto' });
  const isNuxt = computed(() => shuimoConfig?.svgInject === 'nuxt');
  const isAuto = computed(() => shuimoConfig?.svgInject === 'auto');
  const svgUrl = isNuxt.value ? `m-shuimo/icon/icon.svg#${svgId.value}` : `#${svgId.value}`;

  const installIconSvg = () => {
    if (!document) {return;}
    if (!document.getElementById(svgId.value)) {
      const svg = h(MSvgSymbol);
      const div = document.createElement('div');
      createApp({ render: () => svg }).mount(div);
      // todo use body maybe have some problem...
      document.body.appendChild(div);
    }
  };

  return {
    isNuxt,
    isAuto,
    svgUrl,
    installIconSvg,
  };
}
