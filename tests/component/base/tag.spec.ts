/**
 * @description tag标签测试用例
 * @author 阿怪
 * @date 2022/8/11 01:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MTag from '../../../lib/base/tag/MTag';

describe('标签组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MTag);
    expect(wrapper.html()).toContain('<div class="m-tag');
  });

  test('插槽text', () => {
    const wrapper = mount(MTag, {
      slots: {
        default: 'slot info'
      }
    });
    expect(wrapper.text()).toMatchInlineSnapshot('"slot info"');
  });

  test('参数type', () => {
    const wrapper = mount(MTag, {
      props: {
        type: 'primary'
      }
    });
    expect(wrapper.html()).toContain('m-tag-primary');
  });
});
