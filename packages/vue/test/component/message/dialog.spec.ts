/**
 * @description 弹窗测试用例
 * @author 阿怪
 * @date 2022/5/2 06:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import { h } from 'vue';
import { MDialog } from '../../../index';

describe('dialog', () => {
  const body = document.body;

  test('render', () => {
    const wrapper = mount(MDialog, {
      slots: {
        default: () => h('div', 'hello')
      }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-dialog-wrapper\\">
        <div class=\\"m-dialog-active\\">
          <!---->
        </div>
      </div>"
    `);
  });


  describe('props', function () {
    test('default show dialog', () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      expect(body.outerHTML).toContain('"m-dialog"');
      wrapper.unmount();
    });

    test('no mask', async () => {
      const wrapper = mount(MDialog, {
        props: {
          mask: { show: false },
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.findAll('m-dialog-mask-bg').length).toBe(0);
      wrapper.unmount();
    });

    test('no close', async () => {
      const wrapper = mount(MDialog, {
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

    test('render close button', async () => {
      const wrapper = mount(MDialog, {
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

    test('change visible', async () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: false
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.html()).not.toContain('"m-dialog"');
      await wrapper.setProps({ visible: true });
      expect(bodyWrapper.html()).toContain('"m-dialog"');
      wrapper.unmount();
    });
  });

  describe('close event', function () {

    test('click mask will close dialog', async () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.html()).toContain('hello');
      await bodyWrapper.find('.m-dialog-mask').trigger('click');
      expect(bodyWrapper.html()).not.toContain('hello');
      wrapper.unmount();
    });

    test('click close button will close dialog', async () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.html()).toContain('hello');
      await bodyWrapper.find('.m-dialog-close-btn').trigger('click');
      expect(bodyWrapper.html()).not.toContain('hello');
      wrapper.unmount();
    });

    test('click m-dialog won\'t close dialog', async () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.html()).toContain('hello');
      await bodyWrapper.find('.m-dialog').trigger('click');
      expect(bodyWrapper.html()).toContain('hello');
      wrapper.unmount();
    });

  });

  describe('slot', function () {

    test('action slot', async () => {
      const wrapper = mount(MDialog, {
        slots: {
          default: () => h('div', 'hello'),
          active: () => h('div', 'active')
        }
      });
      const bodyWrapper = new DOMWrapper(body);
      expect(bodyWrapper.html()).not.toContain('hello');
      expect(wrapper.html()).toContain('active');
      await wrapper.find('.m-dialog-active').trigger('click');
      expect(bodyWrapper.html()).toContain('hello');
      wrapper.unmount();
    });

  });

  describe('teleport', function () {

    test('default to body', () => {
      const wrapper = mount(MDialog, {
        props: {
          visible: true
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      expect(body.outerHTML).toContain('"m-dialog"');
      wrapper.unmount();
    });

    test('teleport to div.container', () => {
      const container = document.createElement('div');
      container.className = 'container';
      body.appendChild(container);
      const wrapper = mount(MDialog, {
        props: {
          visible: true,
          teleport: {
            to: '.container'
          }
        },
        slots: {
          default: () => h('div', 'hello')
        }
      });
      expect(container.outerHTML).toContain('"m-dialog"');
      wrapper.unmount();

    });

  });

});
