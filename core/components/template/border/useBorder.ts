/**
 * @description border component core hook
 * @author 阿怪
 * @date 2025/1/21 11:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { BorderProps } from './props';
import { lineType } from './lineType.ts';
import { defineHook } from '../../../runtime/defineHook.ts';
import { props } from './api.ts';

const toBoolean = (value: any) => {
  if (value === undefined) return undefined;
  if (value === 'false') return false;
  return Boolean(value);
};

const gettingBorder = (props: BorderProps): Record<lineType, boolean> => {
  const {
    border,
    right, left, top, bottom,
  } = props;
  // 默认right left top bottom都是undefined,但是优先级高于border
  // border可能是布尔值，也可能直接指定top right bottom left
  if (typeof border === 'boolean' || border === undefined) {
    const defaultBorderBoolean = border ?? true;
    return {
      top: toBoolean(top) ?? defaultBorderBoolean,
      left: toBoolean(left) ?? defaultBorderBoolean,
      right: toBoolean(right) ?? defaultBorderBoolean,
      bottom: toBoolean(bottom) ?? defaultBorderBoolean,
    };
  } else {
    return {
      top: toBoolean(top) ?? border.top ?? true,
      left: toBoolean(left) ?? border.left ?? true,
      right: toBoolean(right) ?? border.right ?? true,
      bottom: toBoolean(bottom) ?? border.bottom ?? true,
    };
  }
};

export const borderOptions = {
  name:'MBorder',
  props,
}

export const useBorder = defineHook((_props, ctx) => {
  const props = _props as Required<BorderProps>;


  const renderInit = () => {
    const borderSetting = gettingBorder(props);

    const renderTypes = Object.entries(borderSetting).filter(([key, value]) => value).map(([key]) => key);


    return {
      renderTypes,
    };
  };

  return {
    props,
    renderInit,
  };

});


if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('gettingBorder', () => {

    it('border is undefined', () => {
      const props = {} as Required<BorderProps>;
      expect(gettingBorder(props)).toEqual({ top: true, right: true, bottom: true, left: true });
    });

    describe('boolean border', () => {

      it('border is true', () => {
        const props = { border: true } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: true, right: true, bottom: true, left: true });
      });

      it('border is false', () => {
        const props = { border: false } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: false, right: false, bottom: false, left: false });
      });

      it('border true,left false', () => {
        const props = { border: true, left: false } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: true, right: true, bottom: true, left: false });
      });

      it('border false,left true', () => {
        const props = { border: false, left: true } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: false, right: false, bottom: false, left: true });
      });
    });

    describe('object border', () => {

      it('border is { top: false, right: false, bottom: false, left: true }', () => {
        const props = { border: { top: false, right: false, bottom: false, left: true } } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: false, right: false, bottom: false, left: true });
      });

      it('border is { top: false, right: false, bottom: false, left: true }, left false', () => {
        const props = { border: { top: false, right: false, bottom: false, left: true }, left: false } as Required<BorderProps>;
        expect(gettingBorder(props)).toEqual({ top: false, right: false, bottom: false, left: false });
      });

    });


  });

}
