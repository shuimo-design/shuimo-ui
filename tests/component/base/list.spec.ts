/**
 * @description list测试用例
 * @author 阿怪
 * @date 2022/4/24 23:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import WList from "../../../lib/base/list/WList";
import { dGet } from "../tools/domUtils";

describe('列表组件', () => {

  test('普通数据渲染', () => {
    const wrapper = mount(WList, {
      props: {
        data: ['轩辕剑', '湛卢', '赤霄']
      }
    });
    expect(dGet(wrapper,'.w-list-item-main').text()).toBe('"轩辕剑"');
  })

  test('active数据渲染', () => {
    const wrapper = mount(WList, {
      props: {
        data: [
          { title: '轩辕剑', value: 40, active: true },
          { title: '湛卢', value: 60 },
          { title: '赤霄', value: 30 }
        ]
      }
    });
    const res= dGet(wrapper,'.w-list-item');
    expect(dGet(wrapper,'.w-list-item').html().includes('w-active')).toBe(true);
  })

})
