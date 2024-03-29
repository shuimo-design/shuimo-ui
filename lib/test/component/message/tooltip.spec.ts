/**
 * @description tooltip组件
 * @author 阿怪
 * @date 2022/5/2 08:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { beforeAll, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MTooltip from '../../../components/message/tooltip/MTooltip.tsx';


beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
});

describe('tooltip组件', () => {
  test('正常渲染', () => {
    const wrapper = mount(MTooltip, {
      slots: { default: () => 'hello' },
    });
    expect(wrapper.html()).toContain('m-tooltip');
  });
});
