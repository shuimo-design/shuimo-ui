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
import MDrawer from '../../../components/message/drawer/MDrawer.tsx';

describe('drawer', () => {
  const body = document.body;
  test('default render', () => {
    const wrapper = mount(MDrawer, {
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    expect(body.outerHTML).not.toContain('m-drawer');
    wrapper.unmount();
  });

  test('show drawer', () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
      },
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    expect(body.outerHTML).toContain('m-drawer');
    wrapper.unmount();
  });

  test('click mask will close drawer', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
      },
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    const bodyWrapper = new DOMWrapper(body);
    await bodyWrapper.find('.m-model-mask').trigger('click');
    expect(bodyWrapper.html()).not.toContain('hello');
    wrapper.unmount();
  });

  test('no mask', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        mask: { show: false },
        visible: true,
      },
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.findAll('m-model-mask-bg').length).toBe(0);
    wrapper.unmount();
  });

  test('with active', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        mask: { show: false },
        visible: true,
      },
      slots: {
        active: () => h('div', 'active'),
        default: () => h('div', 'hello'),
      },
    });
    expect(wrapper.find('.m-model-active').html()).toMatchInlineSnapshot(`
      "<div class="m-model-active">
        <div>active</div>
      </div>"
    `);
  });

  test.skip('no close', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
        closeBtn: false,
      },
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.html()).not.toContain('m-dialog-close-btn');
    wrapper.unmount();
  });

  test.skip('render close button', async () => {
    const wrapper = mount(MDrawer, {
      props: {
        visible: true,
        closeBtn: true,
      },
      slots: {
        default: () => h('div', 'hello'),
      },
    });
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.html()).toContain('m-dialog-close-btn');
    wrapper.unmount();
  });
});
