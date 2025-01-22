/**
 * @description loading hook
 * @author 阿怪
 * @date 2025/1/22 12:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { props } from './api.ts';
import { defineHook } from '../../../runtime/defineHook.ts';
import { LoadingProps } from './props';
import { computed } from 'vue';


export const loadingOptions = {
  name: 'MLoading',
  props,
}

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 50;

export const useLoading = defineHook((_props, ctx) => {
  const props = _props as Required<LoadingProps>;

  const renderInit = () => {
    const getStyle = (props: Pick<LoadingProps, 'speed' | 'sideLength' | 'size'>) => {
      const styleRecord: Record<string, string | number | undefined> = {};

      if (props.speed && props.speed !== 1500) {
        styleRecord['--m-loading-speed'] = `${(props.speed ?? 1500) / 1000}s`;
      }

      if (props.size && props.size !== 1) {
        const logoWidth = (props.size ?? 1) * DEFAULT_WIDTH;
        const logoHeight = (props.size ?? 1) * DEFAULT_HEIGHT;
        styleRecord['--m-loading-size-w'] = `${logoWidth}px`;
        styleRecord['--m-loading-size-h'] = `${logoHeight}px`;
      }

      if (props.sideLength !== 64) {
        const isNumber = !isNaN(Number(props.sideLength));

        if (isNumber) {
          const fixedSideLength = isNumber ? `${props.sideLength}px` : props.sideLength;
          styleRecord.height = fixedSideLength;
          styleRecord.width = fixedSideLength;
        }
      }


      return styleRecord;
    };

    const loadingStyle = computed(()=>getStyle(props));

    const loadingClass = ['m-loading', { 'm-loading-mask': props.mask }];

    const indicator = ctx.slots.indicator?.()?? <div class="m-loading-main"></div>;

    return {
      getStyle,
      loadingClass,
      loadingStyle,
      indicator
    }
  }

  return {
    renderInit
  }
})
