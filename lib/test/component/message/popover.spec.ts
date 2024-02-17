/**
 * @description popover组件测试用例
 * @author 阿怪
 * @date 2022/5/2 08:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { beforeAll, describe, expect, test, vi } from 'vitest';
import { DOMWrapper, mount } from '@vue/test-utils';
import { PopoverProps } from '../../../components/message/popover';
import MPopover from '../../../components/message/popover/MPopover.tsx';


beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
});

describe('popover', () => {
  const getWrapper = (props: PopoverProps, slots: {
    default: any,
    content: any,
  }) => {
    return mount(MPopover, {
      props,
      slots
    });
  };


  test('render', () => {
    const wrapper = getWrapper({}, {
      default: () => 'hello',
      content: () => 'world'
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-popover" data-popper-placement="bottom">
        <div class="m-popover-default-wrapper">hello</div>
        <div class="m-popover-content">
          <!---->
          <!---->
        </div>
      </div>"
    `);
  });

  describe('expose', function () {
    test('show and hide', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper({}, {
        default: () => 'hello',
        content: () => 'world'
      });
      const instance = wrapper.vm as any; //  fix any
      expect(wrapper.find('.m-popover-content').html()).not.toContain('world');
      await instance.show();
      expect(wrapper.find('.m-popover-content').html()).toContain('world');
      instance.hide();
      await vi.runOnlyPendingTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).not.toContain('world');
    })
  });


  describe('event', () => {
    test('click', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper({}, {
        default: () => 'hello',
        content: () => 'world'
      });
      wrapper.find('.m-popover-default-wrapper').trigger('click');
      await vi.runOnlyPendingTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).toContain('world');
    });


    test('click away', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper({}, {
        default: () => 'hello',
        content: () => 'world'
      });
      await wrapper.find('.m-popover-default-wrapper').trigger('click');
      await vi.runAllTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).toContain('world');
      const bodyWrapper = new DOMWrapper(document.body);
      await bodyWrapper.trigger('pointerdown');
      await vi.runAllTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).not.toContain('world');
    });

    test('disabled click away', async () => {
      vi.useFakeTimers();
      const wrapper = getWrapper({ disableClickAway: true }, {
        default: () => 'hello',
        content: () => 'world'
      });
      await wrapper.find('.m-popover-default-wrapper').trigger('click');
      await vi.runAllTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).toContain('world');
      const bodyWrapper = new DOMWrapper(document.body);
      await bodyWrapper.trigger('pointerdown');
      await vi.runAllTimersAsync();
      expect(wrapper.find('.m-popover-content').html()).toContain('world');
    });

    test('test arrow',()=>{
      // todo
    })
  });

});
