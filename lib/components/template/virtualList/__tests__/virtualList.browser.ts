/**
 * @description lib virtualList 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MVirtualList from '../MVirtualList';

const listData = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, text: `列表项 ${i + 1}` }));

describe('MVirtualList browser', () => {
  it('渲染虚拟列表', async () => {
    const { container } = render(MVirtualList, {
      props: { list: listData },
      slots: {
        default: ({ data }: { data: { id: number; text: string } }) =>
          h('div', { class: 'list-item', key: data.id }, data.text),
      },
    });

    expect(container.querySelector('.m-virtual-list')).not.toBeNull();
  });

  it('渲染列表项', async () => {
    const { container } = render(MVirtualList, {
      props: { list: listData },
      slots: {
        default: ({ data }: { data: { id: number; text: string } }) =>
          h('div', { class: 'list-item', key: data.id }, data.text),
      },
    });

    const wrapper = container.querySelector('.m-virtual-list-wrapper');
    expect(wrapper).not.toBeNull();
    // 虚拟列表会渲染可视范围内的部分列表项
    const items = container.querySelectorAll('.list-item');
    expect(items.length).toBeGreaterThan(0);
  });
});
