/**
 * @description list测试用例
 * @author 阿怪
 * @date 2022/4/24 23:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MList from '../../../lib/base/list/MList';

describe('列表组件', () => {
  test('普通数据渲染', () => {
    const wrapper = mount(MList, {
      props: {
        data: ['轩辕剑', '湛卢', '赤霄']
      }
    });
    expect(wrapper.find('.m-list-item-main').text()).toBe('"轩辕剑"');
  });

  test('active数据渲染', () => {
    const wrapper = mount(MList, {
      props: {
        data: [
          { title: '轩辕剑', value: 40, active: true },
          { title: '湛卢', value: 60 },
          { title: '赤霄', value: 30 }
        ]
      }
    });
    expect(wrapper.find('.m-list-item').html().includes('m-active')).toBe(true);
  });
});
