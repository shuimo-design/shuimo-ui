/**
 * @description headless List 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MLi from '../../li/MLi.tsx';
import MList from '../MList';

describe('MList browser', () => {
  it('渲染容器包含 m-list 类名', () => {
    const { container } = render(MList, {
      props: { data: [{ label: '项目一' }] },
      global: { components: { MLi } },
    });

    const el = container.querySelector('.m-list');
    expect(el).not.toBeNull();
  });

  it('data 为空数组时不渲染任何列表项', () => {
    const { container } = render(MList, {
      props: { data: [] },
      global: { components: { MLi } },
    });

    const items = container.querySelectorAll('.m-li');
    expect(items.length).toBe(0);
  });

  it('根据 data 长度渲染对应数量的 m-li', () => {
    const { container } = render(MList, {
      props: {
        data: [{ label: '一' }, { label: '二' }, { label: '三' }],
      },
      global: { components: { MLi } },
    });

    const items = container.querySelectorAll('.m-li');
    expect(items.length).toBe(3);
  });

  it('data 中 active 为 true 的项渲染 m-li-active 类名', () => {
    const { container } = render(MList, {
      props: {
        data: [{ label: '激活项', active: true }, { label: '普通项' }],
      },
      global: { components: { MLi } },
    });

    const items = container.querySelectorAll('.m-li');
    expect(items[0].classList.contains('m-li-active')).toBe(true);
    expect(items[1].classList.contains('m-li-active')).toBe(false);
  });

  it('autoActive 为 true 时所有项渲染 m-li-active 类名', () => {
    const { container } = render(MList, {
      props: {
        data: [{ label: '项目一' }, { label: '项目二' }],
        autoActive: true,
      },
      global: { components: { MLi } },
    });

    const items = container.querySelectorAll('.m-li');
    expect(items.length).toBe(2);
    items.forEach(item => {
      expect(item.classList.contains('m-li-active')).toBe(true);
    });
  });

  it('未传 data 时容器存在但无列表项', () => {
    const { container } = render(MList, {
      props: {},
      global: { components: { MLi } },
    });

    const el = container.querySelector('.m-list');
    expect(el).not.toBeNull();
    const items = container.querySelectorAll('.m-li');
    expect(items.length).toBe(0);
  });

  it('传入默认插槽时使用插槽渲染每个列表项内容', () => {
    const { container } = render(MList, {
      props: {
        data: [{ label: '苹果' }, { label: '香蕉' }],
      },
      slots: {
        default: ({ data }: { data: Record<string, unknown> }) =>
          `自定义-${data.label}`,
      },
      global: { components: { MLi } },
    });

    const inners = container.querySelectorAll('.m-li-inner');
    expect(inners.length).toBe(2);
    expect(inners[0].textContent).toBe('自定义-苹果');
    expect(inners[1].textContent).toBe('自定义-香蕉');
  });
});
