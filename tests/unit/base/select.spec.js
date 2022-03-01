/**
 * @description: select选择框测试用例
 * @author: 南歌子
 * @date 2021/02/23 11:11
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from "vitest";
import WSelect from '../../../lib/base/select/WSelect';
// import { selectDropdown } from '../utils/_util'

describe('选择框组件', () => {
  test('无参数渲染)', () => {
    const wrapper = mount(WSelect);
    expect(wrapper.html()).toContain('w-select');
    wrapper.unmount();
  });

  // todo 事件测试用例不应放在这里
  // test('下拉渲染', async () => {
  //   const map = {};
  //   window.addEventListener = vi.fn((event, cb) => {
  //     map[event] = cb;
  //   });
  //   const teleportTarget = new DOMWrapper(document.querySelector('body'));
  //   const wrapper = mount(WSelect, {
  //     props: {
  //       options: [
  //         { title: 'psm', value: 1 },
  //         { title: 'ngz', value: 2 },
  //         { title: 'kh3', value: 3 },
  //         { title: 'ljx', value: 4 },
  //       ]
  //     }
  //   });
  //   await selectDropdown(wrapper, teleportTarget);
  //   map.mousedown({
  //     path: null
  //   })
  //   map.resize();
  //   await selectDropdown(wrapper, teleportTarget);
  //
  //   const options = teleportTarget.findAll('.dropdown-option');
  //   await options[1].trigger('click');
  //   map.mousedown({
  //     path: [{ classList: ['select-dropdown'] }]
  //   })
  //
  //   expect(teleportTarget.find('.select-dropdown').isVisible()).toBe(false);
  //   map.mousedown({
  //     path: [{ classList: [] }]
  //   })
  //   wrapper.unmount();
  // });
  //
  // test('下拉选择', async () => {
  //   const teleportTarget = new DOMWrapper(document.querySelector('body'));
  //   const wrapper = mount(WSelect, {
  //     props: {
  //       options: [
  //         { title: 'psm', value: 1 },
  //         { title: 'ngz', value: 2 },
  //         { title: 'kh3', value: 3 },
  //         { title: 'ljx', value: 4 },
  //       ]
  //     }
  //   });
  //   await wrapper.setProps({ modelValue: 1 })
  //   expect(wrapper.find('.w-select-div span').text()).toBe('1');
  //   await selectDropdown(wrapper, teleportTarget);
  //   expect(teleportTarget.findAll('.dropdown-option')).toHaveLength(4);
  //   const options = teleportTarget.findAll('.dropdown-option');
  //   await options[1].trigger('click');
  //   expect(wrapper.emitted()).toHaveProperty('select');
  //   wrapper.unmount();
  // })
})
