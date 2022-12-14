/**
 * @description 抽屉测试用例
 * @author 阿怪
 * @date 2022/5/2 07:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import { h } from 'vue';
import MDrawer from '../../../lib/message/drawer/MDrawer';

describe('抽屉组件', () => {
  const body = document.body;
  test('默认不显示', () => {
    const wrapper = mount(MDrawer, {
      slots: {
        default: () => h('div', 'hello')
      }
    });
    expect(body.outerHTML).not.toContain('m-drawer');
    wrapper.unmount();
  });

  test('显示弹窗', () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    expect(body.outerHTML).toContain('m-drawer');
    wrapper.unmount();
  });

  test('点击mask触发close', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    const bodyWrapper = new DOMWrapper(body);
    await bodyWrapper.find('.mask').trigger('click');
    expect(wrapper.emitted('close')).toMatchObject([[{ isTrusted: false }]]);
    wrapper.unmount();
  });

  test('不渲染mask背景', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        mask: { show: false },
        visible: true
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.findAll('.mask-bg').length).toBe(0);
    wrapper.unmount();
  });

  test('不渲染close按钮', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
        closeBtn: false
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.html()).not.toContain('m-dialog-close-btn');
    wrapper.unmount();
  });

  test('渲染close按钮', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
        closeBtn: true
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.html()).toContain('m-dialog-close-btn');
    wrapper.unmount();
  });
});
