/**
 * @description list测试用例
 * @author 阿怪
 * @date 2022/4/24 23:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { MList } from '../../../index.ts';

describe('list', () => {
  test('render', () => {
    const wrapper = mount(MList, {
      props: {
        data: ['轩辕剑', '湛卢', '赤霄']
      }
    });
    expect(wrapper.find('.m-li').text()).toBe('轩辕剑');
  });

  test('active', () => {
    const wrapper = mount(MList, {
      props: {
        data: [
          { title: '轩辕剑', value: 40, active: true },
          { title: '湛卢', value: 60 },
          { title: '赤霄', value: 30 }
        ]
      }
    });
    expect(wrapper.find('.m-li').html().includes('m-li-active')).toBe(true);
  });

  test('slot', () => {
    const wrapper = mount({
      components: { MList },
      template: `
        <m-list :data="[{ title: '轩辕剑', value: 40 }]">
          <template #default="{ data }">
            <span class="m-li">{{ data.title }} - {{ data.value }}</span>
          </template>
        </m-list>
      `
    });
    expect(wrapper.find('.m-li').text()).toBe('轩辕剑 - 40');
  })

  describe('error', () => {
    test('data not array', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mount({
        components: { MList },
        template: `<m-list :data="'data'"/>`
      });
      expect(infoSpy).toHaveBeenCalled();

    });
  });
});
