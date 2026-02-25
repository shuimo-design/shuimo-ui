/**
 * @description lib list 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MList from '../MList';

const listData = [
  { label: '列表项一', value: 1 },
  { label: '列表项二', value: 2 },
  { label: '列表项三', value: 3 },
];

describe('MList browser', () => {
  it('渲染列表', async () => {
    const { container } = render(MList, {
      props: { data: listData },
    });

    expect(container.querySelector('.m-list')).not.toBeNull();
  });

  it('渲染列表项内容', async () => {
    const { container } = render(MList, {
      props: { data: listData },
    });

    const list = container.querySelector('.m-list');
    expect(list).not.toBeNull();
    expect(list!.textContent).toContain('列表项一');
    expect(list!.textContent).toContain('列表项二');
  });

  it('使用 slot 自定义渲染', async () => {
    const { container } = render(MList, {
      props: { data: listData },
      slots: {
        default: ({ data }: { data: { label: string; value: number } }) =>
          h('span', { class: 'custom-item' }, `自定义-${data.label}`),
      },
    });

    const items = container.querySelectorAll('.custom-item');
    expect(items.length).toBe(3);
    expect(items[0].textContent).toBe('自定义-列表项一');
  });
});
