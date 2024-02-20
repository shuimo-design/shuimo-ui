/**
 * @description: button按钮测试用例
 * @author: 南歌子
 * @date 2021/02/22 11:44
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 * -- revert from version 9f76444d --
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { MButton } from '../../../index.ts';

describe('button', () => {
  test('render', () => {
    const wrapper = mount(MButton);
    expect(wrapper.html()).toContain('<button class="m-button');
  });

  describe('text', () => {
    test('base text', () => {
      const wrapper = mount(MButton, {
        props: {
          text: 'test',
        },
      });
      expect(wrapper.text()).toMatchInlineSnapshot('"test"');
    });

    test('slot text', () => {
      const wrapper = mount(MButton, {
        slots: {
          default: 'slot info',
        },
      });
      expect(wrapper.text()).toMatchInlineSnapshot('"slot info"');
    });
  });

  test('type', () => {
    const wrapper = mount(MButton, {
      props: {
        type: 'primary',
      },
    });
    expect(wrapper.html()).toContain('m-button-primary');
  });

  test('disabled', () => {
    const wrapper = mount(MButton, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.get('button').element.disabled).toBe(true);
  });

  test('a', () => {
    const wrapper = mount(MButton, {
      props: { link: true },
    });
    expect(wrapper.html()).toContain('<a');
  });
});
