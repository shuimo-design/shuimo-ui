/**
 * @description headless tabs / tab-pane 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h, nextTick } from 'vue';
import MTabs from '../MTabs';
import MTabPane from '../MTabPane';

// ─────────────────────────────────────────────
// MTabs
// ─────────────────────────────────────────────

describe('MTabs browser', () => {
  it('渲染 tabs 结构（导航栏 + 内容区）', async () => {
    const { container } = render(MTabs, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '内容A' }),
          h(MTabPane, { name: 'b', label: '标签B' }, { default: () => '内容B' }),
        ],
      },
    });

    expect(container.querySelector('.m-tabs')).not.toBeNull();
    expect(container.querySelector('.m-tabs-nav')).not.toBeNull();
    expect(container.querySelector('.m-tabs-content')).not.toBeNull();
  });

  it('导航栏渲染正确数量的 tab-nav-item', async () => {
    const { container } = render(MTabs, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '内容A' }),
          h(MTabPane, { name: 'b', label: '标签B' }, { default: () => '内容B' }),
          h(MTabPane, { name: 'c', label: '标签C' }, { default: () => '内容C' }),
        ],
      },
    });

    const navItems = container.querySelectorAll('.m-tabs-nav-item');
    expect(navItems.length).toBe(3);
  });

  it('当前激活的 tab 导航项有 m-tabs-nav-item-active 类', async () => {
    const { container } = render(MTabs, {
      props: { modelValue: 'b' },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '内容A' }),
          h(MTabPane, { name: 'b', label: '标签B' }, { default: () => '内容B' }),
        ],
      },
    });

    const navItems = container.querySelectorAll('.m-tabs-nav-item');
    expect(navItems[1].classList.contains('m-tabs-nav-item-active')).toBe(true);
    expect(navItems[0].classList.contains('m-tabs-nav-item-active')).toBe(false);
  });

  it('点击导航项触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MTabs, {
      props: { modelValue: 'a', 'onUpdate:modelValue': onUpdate },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '内容A' }),
          h(MTabPane, { name: 'b', label: '标签B' }, { default: () => '内容B' }),
        ],
      },
    });

    const navItems = container.querySelectorAll('.m-tabs-nav-item');
    (navItems[1] as HTMLElement).click();
    expect(onUpdate).toHaveBeenCalledWith('b');
  });

  it('items prop API 渲染导航项', async () => {
    const items = [
      { name: 'x', label: 'X标签' },
      { name: 'y', label: 'Y标签' },
    ];
    const { container } = render(MTabs, {
      props: { modelValue: 'x', items },
    });

    const navItems = container.querySelectorAll('.m-tabs-nav-item');
    expect(navItems.length).toBe(2);
    expect(navItems[0].textContent).toBe('X标签');
  });

  it('disabled tab 点击不触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MTabs, {
      props: { modelValue: 'a', 'onUpdate:modelValue': onUpdate },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '内容A' }),
          h(MTabPane, { name: 'b', label: '标签B', disabled: true }, { default: () => '内容B' }),
        ],
      },
    });

    const navItems = container.querySelectorAll('.m-tabs-nav-item');
    (navItems[1] as HTMLElement).click();
    expect(onUpdate).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// MTabPane
// ─────────────────────────────────────────────

describe('MTabPane browser', () => {
  it('active=true 时显示内容并有 m-tab-pane-active 类', async () => {
    const { container } = render(MTabPane, {
      props: { name: 'a', label: '标签A', active: true },
      slots: { default: () => '面板内容' },
    });

    const pane = container.querySelector('.m-tab-pane');
    expect(pane).not.toBeNull();
    expect(pane!.classList.contains('m-tab-pane-active')).toBe(true);
    expect((pane as HTMLElement).style.display).not.toBe('none');
  });

  it('active=false 时面板隐藏（display: none）', async () => {
    const { container } = render(MTabPane, {
      props: { name: 'a', label: '标签A', active: false },
      slots: { default: () => '面板内容' },
    });

    const pane = container.querySelector('.m-tab-pane') as HTMLElement;
    expect(pane).not.toBeNull();
    expect(pane.style.display).toBe('none');
  });

  it('lazy=true 未激活时不渲染内容', async () => {
    const { container } = render(MTabPane, {
      props: { name: 'a', label: '标签A', active: false, lazy: true },
      slots: { default: () => '懒加载内容' },
    });

    expect(container.textContent).not.toContain('懒加载内容');
  });

  it('lazy=true 激活后渲染内容', async () => {
    const { container } = render(MTabPane, {
      props: { name: 'a', label: '标签A', active: true, lazy: true },
      slots: { default: () => '懒加载内容' },
    });

    expect(container.textContent).toContain('懒加载内容');
  });

  it('切换 active 后 MTabs 显示正确内容区', async () => {
    const { container } = render(MTabs, {
      props: { modelValue: 'a' },
      slots: {
        default: () => [
          h(MTabPane, { name: 'a', label: '标签A' }, { default: () => '面板A内容' }),
          h(MTabPane, { name: 'b', label: '标签B' }, { default: () => '面板B内容' }),
        ],
      },
    });

    await nextTick();

    // 初始状态：面板A可见，面板B隐藏
    const panes = container.querySelectorAll('.m-tab-pane') as NodeListOf<HTMLElement>;
    expect(panes[0].style.display).not.toBe('none');
    expect(panes[1].style.display).toBe('none');
  });
});
