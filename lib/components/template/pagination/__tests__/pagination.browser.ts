/**
 * @description lib pagination 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MPagination from '../MPagination';

describe('MPagination browser', () => {
  it('渲染分页', async () => {
    const { container } = render(MPagination, {
      props: { total: 100, modelValue: 1 },
    });

    expect(container.querySelector('.m-pagination')).not.toBeNull();
  });

  it('显示页码', async () => {
    const { container } = render(MPagination, {
      props: { total: 50, modelValue: 1, pageSize: 10 },
    });

    const pagination = container.querySelector('.m-pagination');
    expect(pagination).not.toBeNull();
    // 分页按钮应存在
    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers.length).toBeGreaterThan(0);
  });

  it('显示总条数', async () => {
    const { container } = render(MPagination, {
      props: { total: 88, modelValue: 1, layout: 'total, prev, pager, next' },
    });

    const total = container.querySelector('.m-page-total');
    expect(total).not.toBeNull();
    expect(total!.textContent).toContain('88');
  });

  it('点击页码触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        modelValue: 1,
        pageSize: 10,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers.length).toBeGreaterThan(1);
    (pagers[1] as HTMLElement).click();

    expect(onUpdate).toHaveBeenCalled();
  });
});
