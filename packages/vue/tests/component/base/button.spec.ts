/**
 * @description: button按钮测试用例
 * @author: 南歌子
 * @date 2021/02/22 11:44
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import MButton from '../../../lib/base/button/MButton';

describe('按钮组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MButton);
    expect(wrapper.html()).toContain('<button class="m-button');
  });

  describe('参数按钮内置文本', () => {
    test.skip('参数text', () => {
      // todo support text
      const wrapper = mount(MButton, {
        props: {
          text: 'test'
        }
      });
      expect(wrapper.text()).toMatchInlineSnapshot('"test"');
    });

    test('插槽text', () => {
      const wrapper = mount(MButton, {
        slots: {
          default: 'slot info'
        }
      });
      expect(wrapper.text()).toMatchInlineSnapshot('"slot info"');
    });
  });

  test('参数type', () => {
    const wrapper = mount(MButton, {
      props: {
        type: 'primary'
      }
    });
    expect(wrapper.html()).toContain('m-button-primary');
  });

  test('参数disabled', () => {
    const wrapper = mount(MButton, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.get('button').element.disabled).toBe(true);
  });

  test('link type', () => {
    const wrapper = mount(MButton, {
      props: { link: true }
    });
    expect(wrapper.html()).not.toContain('<button');
    expect(wrapper.html()).toContain('<a');
  });
});
