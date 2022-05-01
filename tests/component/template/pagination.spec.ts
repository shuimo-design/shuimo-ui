/**
 * @description 分页测试用例
 * @author 阿怪
 * @date 2022/5/2 06:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from 'vitest';
import { mount } from "@vue/test-utils";
import WPagination from "../../../lib/template/pagination/WPagination";


describe('分页组件', function () {
  const wrapper = mount(WPagination, {
    props: {
      total: 11
    }
  });
  test('分页组件', () => {
    expect(wrapper.findAll('li').length).toBe(2);
  });

  test('点击跳转', async () => {
    await wrapper.find('.page-next').trigger('click');
    expect(wrapper.emitted('update:current')).toEqual([[2]]);
  })
});
