/**
 * @description headless Pagination 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MPagination from '../MPagination';

describe('MPagination browser', () => {
  // --- 基础渲染 ---
  it('渲染分页组件并包含 prev/pager/next 元素', async () => {
    const { container } = render(MPagination, {
      props: { total: 100, pageSize: 10 },
    });

    expect(container.querySelector('.m-pagination')).not.toBeNull();
    expect(container.querySelector('.m-page-prev')).not.toBeNull();
    expect(container.querySelector('.m-page-next')).not.toBeNull();
    // 页码列表
    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers.length).toBeGreaterThan(0);
  });

  it('渲染 total 区域显示总条数', async () => {
    const { container } = render(MPagination, {
      props: { total: 100, pageSize: 10 },
    });

    const totalEl = container.querySelector('.m-page-total');
    expect(totalEl).not.toBeNull();
    expect(totalEl!.textContent).toContain('100');
  });

  // --- 页码显示 ---
  it('total=100, pageSize=10 时共 10 页', async () => {
    const { container } = render(MPagination, {
      props: {
        total: 100,
        pageSize: 10,
        // 关闭折叠以确保所有页码可见
        maxPageBtn: null,
        foldedMaxPageBtn: null,
      },
    });

    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers.length).toBe(10);
  });

  it('第 1 页时第一个 pager 有 m-pager-current 类', async () => {
    const { container } = render(MPagination, {
      props: { total: 50, pageSize: 10, modelValue: 1, maxPageBtn: null },
    });

    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers[0].classList.contains('m-pager-current')).toBe(true);
  });

  it('modelValue=3 时第 3 个 pager 有 m-pager-current 类', async () => {
    const { container } = render(MPagination, {
      props: { total: 50, pageSize: 10, modelValue: 3, maxPageBtn: null },
    });

    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers[2].classList.contains('m-pager-current')).toBe(true);
  });

  // --- 点击页码 ---
  it('点击页码切换并触发 update:modelValue 和 change 事件', async () => {
    const onUpdate = vi.fn();
    const onChange = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        modelValue: 1,
        maxPageBtn: null,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    });

    // 点击第 3 个页码
    const pagers = container.querySelectorAll('.m-pager');
    (pagers[2] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onUpdate).toHaveBeenCalledWith(3);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  // --- 上一页 / 下一页 ---
  it('点击下一页触发 update:modelValue(2)', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        modelValue: 1,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const next = container.querySelector('.m-page-next') as HTMLElement;
    next.click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onUpdate).toHaveBeenCalledWith(2);
  });

  it('点击上一页从第 3 页跳到第 2 页', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        modelValue: 3,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const prev = container.querySelector('.m-page-prev') as HTMLElement;
    prev.click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onUpdate).toHaveBeenCalledWith(2);
  });

  // --- 禁用状态 ---
  it('首页时上一页按钮带 m-page-prev-disabled 类', async () => {
    const { container } = render(MPagination, {
      props: { total: 50, pageSize: 10, modelValue: 1 },
    });

    const prev = container.querySelector('.m-page-prev') as HTMLElement;
    expect(prev.classList.contains('m-page-prev-disabled')).toBe(true);
  });

  it('末页时下一页按钮带 m-page-next-disabled 类', async () => {
    const { container } = render(MPagination, {
      props: { total: 50, pageSize: 10, modelValue: 5 },
    });

    const next = container.querySelector('.m-page-next') as HTMLElement;
    expect(next.classList.contains('m-page-next-disabled')).toBe(true);
  });

  it('首页时点击上一页不触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        modelValue: 1,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const prev = container.querySelector('.m-page-prev') as HTMLElement;
    prev.click();
    await nextTick();

    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('末页时点击下一页不触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        modelValue: 5,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const next = container.querySelector('.m-page-next') as HTMLElement;
    next.click();
    await nextTick();

    expect(onUpdate).not.toHaveBeenCalled();
  });

  // --- layout ---
  it('layout 只含 pager 时不渲染 prev/next/total', async () => {
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        layout: 'pager',
        maxPageBtn: null,
      },
    });

    expect(container.querySelector('.m-page-prev')).toBeNull();
    expect(container.querySelector('.m-page-next')).toBeNull();
    expect(container.querySelector('.m-page-total')).toBeNull();
    expect(container.querySelectorAll('.m-pager').length).toBeGreaterThan(0);
  });

  // --- defaultCurrent ---
  it('defaultCurrent 设置初始页码', async () => {
    const { container } = render(MPagination, {
      props: {
        total: 50,
        pageSize: 10,
        defaultCurrent: 2,
        maxPageBtn: null,
      },
    });

    const pagers = container.querySelectorAll('.m-pager');
    expect(pagers[1].classList.contains('m-pager-current')).toBe(true);
  });
});
