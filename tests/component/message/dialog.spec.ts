/**
 * @description 弹窗测试用例
 * @author 阿怪
 * @date 2022/5/2 06:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from "vitest";
import { DOMWrapper, mount } from "@vue/test-utils";
import { h } from "vue";
import WDialog from "../../../lib/message/dialog/WDialog";

describe('弹窗组件', () => {
  const body = document.body;
  test('默认不显示', () => {
    const wrapper = mount(WDialog, {
      slots: {
        default: () => h('div', 'hello')
      }
    });
    expect(body.outerHTML).not.toContain('w-dialog');
    wrapper.unmount();
  });

  test('显示弹窗', () => {
    const wrapper = mount(WDialog, {
      props: {
        visible: true
      },
      slots: {
        default: () => h('div', 'hello')
      }
    });
    expect(body.outerHTML).toContain('w-dialog');
    wrapper.unmount();
  });

  test('点击mask触发close', async () => {
    const wrapper = mount(WDialog, {
      props: {
        visible: true,
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

  test('点击关闭按钮触发close', async () => {
    const wrapper = mount(WDialog, {
      props: {
        visible: true,
      },
      slots: {
        default: () => h('div', 'hello')
      }

    });
    const bodyWrapper = new DOMWrapper(body);
    await bodyWrapper.find('.dialog-close-btn').trigger('click');
    expect(wrapper.emitted('close')).toMatchObject([[{ isTrusted: false }]]);
    wrapper.unmount();
  });

  test('不渲染mask背景', async () => {
    const wrapper = mount(WDialog, {
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
});
