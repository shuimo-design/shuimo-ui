/**
 * @description progress滚动条测试用例
 * @author 阿怪
 * @date 2021/2/25 4:06 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import MProgress from '../../../lib/other/progress/MProgress';
import { h } from 'vue';

describe('滚动条组件', () => {
  test('无参数渲染', () => {
    const wrapper = mount(MProgress);
    expect(wrapper.html()).toContain('m-progress');
  });

  test('显示info', () => {
    const wrapper = mount(MProgress, {
      props: { showInfo: true },
      slots: {
        default: h('span', '默认')
      }
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-progress-border\\" style=\\"--m-progress-width: 399px; --m-progress-height: 26.547px; --m-progress-per-height: 28px; --m-progress-per-width: 68.40366972477064px; --m-progress-leaf-height: 28px;\\">
        <div class=\\"m-progress-per\\" style=\\"left: -22px;\\"><img class=\\"leaf\\" src=\\"/lib/assets/progress/leaf.png\\" alt=\\"\\"><span>默认</span></div><progress class=\\"m-progress\\" max=\\"100\\" style=\\"--m-progress-width: 399px; --m-progress-height: 26.547px;\\" value=\\"0\\"></progress>
      </div>"
    `);
  });
});
