/**
 * @description loading组件测试用例
 * @author 阿怪
 * @date 2022/8/28 04:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { LoadingProps } from '../../../components/other/loading';
import MLoading from '../../../components/other/loading/MLoading.tsx';

describe('loading', function () {
  const getWrapper = (props?: LoadingProps) => {
    return mount(MLoading, { props });
  };

  test('render', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toContain('m-loading');
    wrapper.unmount();
  });

  describe('props', () => {
    test('mask', () => {
      const wrapper = getWrapper({ mask: true });
      expect(wrapper.find('.m-loading-mask')).not.toBeNull();
      wrapper.unmount();
    });

    test('sideLength:200', () => {
      const wrapper = getWrapper({ sideLength: 200 });
      expect(wrapper.find('.m-loading').element.getAttribute('style')).toContain('height: 200px; width: 200px;');
      wrapper.unmount();
    });

    test.skip('sideLength:10vh', () => {
      const wrapper = getWrapper({ sideLength: '10vh' });
      expect(wrapper.find('.m-loading').element.getAttribute('style')).toContain('height: 10vh; width: 10vh;');
      wrapper.unmount();
    });

    test.skip('size:2', () => {
      const DEFAULT_WIDTH = 64;
      const DEFAULT_HEIGHT = 50;
      const wrapper = getWrapper({ size: 2 });
      expect(wrapper.find('.m-loading').element.getAttribute('style')).toContain(`--m-loading-size-w: ${DEFAULT_WIDTH * 2}px; --m-loading-size-h: ${DEFAULT_HEIGHT * 2};`);
      wrapper.unmount();
    });

    test.skip('speed:800', () => {
      const wrapper = getWrapper({ speed: 800 });
      expect(wrapper.find('.m-loading').element.getAttribute('style')).toContain('--m-loading-speed: 0.8s;');
      wrapper.unmount();
    });
  });

  describe.skip('animation', () => {
    const getItemClass = (wrapper: VueWrapper) =>
      wrapper.findAll('.m-loading-item').map(item => item.element.className.replace('m-loading-item ', ''));

    test('animation loop', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper();
      const classStr = getItemClass(wrapper);
      await vi.runOnlyPendingTimers();
      const newClassStr = getItemClass(wrapper);
      expect(newClassStr[1]).not.toBe(classStr[1]);
      wrapper.unmount();
    });

    test('animation classList array size check', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper();

      const classList = getItemClass(wrapper);
      const classListArray = Array.from(classList);

      await vi.runOnlyPendingTimers();
      classListArray.push(...getItemClass(wrapper));

      await vi.runOnlyPendingTimers();
      classListArray.push(...getItemClass(wrapper));

      await vi.runOnlyPendingTimers();
      classListArray.push(...getItemClass(wrapper));

      expect(new Set(classListArray).size).toBe(8);

      wrapper.unmount();
    });

    test('The 5th time is different from the 4th time', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper();
      await vi.runOnlyPendingTimers();
      await vi.runOnlyPendingTimers();
      await vi.runOnlyPendingTimers();
      const classList = getItemClass(wrapper);
      await vi.runOnlyPendingTimers();
      const afterClassList = getItemClass(wrapper);
      expect(classList[0]).not.toBe(afterClassList[1]);

      wrapper.unmount();
    });
  });
});
