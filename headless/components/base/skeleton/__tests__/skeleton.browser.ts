/**
 * @description headless skeleton 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MSkeleton from '../MSkeleton';

describe('MSkeleton browser', () => {
  it('loading=true 时渲染 m-skeleton 骨架', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true },
      slots: { default: () => '真实内容' },
    });

    expect(container.querySelector('.m-skeleton')).not.toBeNull();
    expect(container.textContent).not.toContain('真实内容');
  });

  it('loading=false 时渲染真实内容插槽', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: false },
      slots: { default: () => '真实内容' },
    });

    expect(container.querySelector('.m-skeleton')).toBeNull();
    expect(container.textContent).toContain('真实内容');
  });

  it('默认渲染标题占位条 m-skeleton-title', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true },
    });

    expect(container.querySelector('.m-skeleton-title')).not.toBeNull();
  });

  it('title=false 时不渲染标题占位条', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true, title: false },
    });

    expect(container.querySelector('.m-skeleton-title')).toBeNull();
  });

  it('默认渲染 3 行文本占位条', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true },
    });

    const rows = container.querySelectorAll('.m-skeleton-row');
    expect(rows.length).toBe(3);
  });

  it('rows=5 时渲染 5 行文本占位条', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true, rows: 5 },
    });

    const rows = container.querySelectorAll('.m-skeleton-row');
    expect(rows.length).toBe(5);
  });

  it('最后一行占位条宽度为 60%', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true, rows: 3 },
    });

    const rows = container.querySelectorAll('.m-skeleton-row') as NodeListOf<HTMLElement>;
    expect(rows[2].style.width).toBe('60%');
  });

  it('avatar=true 时渲染头像占位圆', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true, avatar: true },
    });

    expect(container.querySelector('.m-skeleton-avatar')).not.toBeNull();
  });

  it('默认有 m-skeleton-animated 动画类', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true },
    });

    expect(container.querySelector('.m-skeleton-animated')).not.toBeNull();
  });

  it('animated=false 时无动画类', async () => {
    const { container } = render(MSkeleton, {
      props: { loading: true, animated: false },
    });

    const skeleton = container.querySelector('.m-skeleton');
    expect(skeleton!.classList.contains('m-skeleton-animated')).toBe(false);
  });
});
