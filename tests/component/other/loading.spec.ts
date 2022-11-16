/**
 * @description loading组件测试用例
 * @author 阿怪
 * @date 2022/8/28 04:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MLoading from '../../../lib/other/loading/MLoading';
import { LoadingProps } from '../../../lib/other/loading';

describe('加载组件', function () {
  const getWrapper = (props?: LoadingProps) => {
    return mount(MLoading, { props });
  };

  test('无参数渲染', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toContain('m-loading');
    wrapper.unmount();
  });

  describe('参数测试', () => {
    test('显示mask', () => {
      const wrapper = getWrapper({ mask: true });
      expect(wrapper.find('.m-loading-mask')).not.toBeNull();
      wrapper.unmount();
    });

    test('设置sideLength为200', () => {
      const wrapper = getWrapper({ sideLength: 200 });
      expect(wrapper.find('.m-loading-item').element.getAttribute('style')).toBe('height: 200px; width: 200px;');
      wrapper.unmount();
    });

    test('设置sideLength为10vh', () => {
      const wrapper = getWrapper({ sideLength: '10vh' });
      expect(wrapper.find('.m-loading-item').element.getAttribute('style')).toBe('height: 10vh; width: 10vh;');
      wrapper.unmount();
    });
  });

  describe('动画循环', () => {
    const getItemClass = (wrapper: VueWrapper) =>
      wrapper.findAll('.m-loading-item').map(item => item.element.className.replace('m-loading-item ', ''));

    test('动画循环校验', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper();
      const classStr = getItemClass(wrapper);
      await vi.runOnlyPendingTimers();
      const newClassStr = getItemClass(wrapper);
      expect(newClassStr[1]).not.toBe(classStr[1]);
      wrapper.unmount();
    });

    test('动画4次不重复', async () => {
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

      expect(new Set(classListArray).size).toBe(4);

      wrapper.unmount();
    });

    test('第5次与第4次不同', async () => {
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
