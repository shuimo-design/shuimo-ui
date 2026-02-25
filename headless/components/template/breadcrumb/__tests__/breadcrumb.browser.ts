/**
 * @description headless Breadcrumb 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MBreadcrumb from '../MBreadcrumb';

const baseItems = [
  { label: '首页', href: '/' },
  { label: '组件', href: '/components' },
  { label: '面包屑' },
];

describe('MBreadcrumb browser', () => {
  // --- 基础渲染 ---
  it('渲染 nav.m-breadcrumb 容器', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    const nav = container.querySelector('nav.m-breadcrumb');
    expect(nav).not.toBeNull();
  });

  it('根据 items 渲染正确数量的 breadcrumb-item', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    const items = container.querySelectorAll('.m-breadcrumb-item');
    // 3 个 items
    expect(items.length).toBe(3);
  });

  // --- 链接渲染 ---
  it('有 href 的项渲染为 <a> 标签', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    const links = container.querySelectorAll('a.m-breadcrumb-item');
    // 首页和组件有 href，末项无 href
    expect(links.length).toBe(2);
    expect((links[0] as HTMLAnchorElement).href).toContain('/');
    expect((links[1] as HTMLAnchorElement).href).toContain('/components');
  });

  it('无 href 的项渲染为 <span> 标签', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    // 末项无 href，应该是 span
    const spans = container.querySelectorAll('span.m-breadcrumb-item');
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe('面包屑');
  });

  // --- 分隔符 ---
  it('渲染默认分隔符 "/"', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    const separators = container.querySelectorAll('.m-breadcrumb-separator');
    // 3 个 item 有 2 个分隔符
    expect(separators.length).toBe(2);
    expect(separators[0].textContent).toBe('/');
  });

  it('自定义分隔符 ">" 正确渲染', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems, separator: '>' },
    });

    const separators = container.querySelectorAll('.m-breadcrumb-separator');
    expect(separators.length).toBe(2);
    expect(separators[0].textContent).toBe('>');
  });

  it('末尾项之后不追加分隔符', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
    });

    const items = container.querySelectorAll('.m-breadcrumb-item');
    const separators = container.querySelectorAll('.m-breadcrumb-separator');
    // 分隔符数量应为 items.length - 1
    expect(separators.length).toBe(items.length - 1);
  });

  // --- disabled ---
  it('disabled 项带 m-breadcrumb-item-disabled 类', async () => {
    const items = [
      { label: '首页', href: '/' },
      { label: '禁用项', href: '/disabled', disabled: true },
      { label: '当前页' },
    ];

    const { container } = render(MBreadcrumb, {
      props: { items },
    });

    const disabled = container.querySelector('.m-breadcrumb-item-disabled');
    expect(disabled).not.toBeNull();
    expect(disabled!.textContent).toBe('禁用项');
  });

  it('有 href 但 disabled 的项渲染为 <span>（不渲染为 <a>）', async () => {
    const items = [
      { label: '首页', href: '/' },
      { label: '禁用链接', href: '/no-link', disabled: true },
    ];

    const { container } = render(MBreadcrumb, {
      props: { items },
    });

    // 禁用状态下即使有 href 也应该渲染 span
    const disabledEl = container.querySelector('.m-breadcrumb-item-disabled');
    expect(disabledEl).not.toBeNull();
    expect(disabledEl!.tagName.toLowerCase()).toBe('span');
  });

  // --- default slot 覆盖 ---
  it('提供 default slot 时完全覆盖 items 渲染', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: baseItems },
      slots: {
        default: '<li class="custom-item">自定义内容</li>',
      },
    });

    // 自定义 slot 内容存在
    expect(container.querySelector('.custom-item')).not.toBeNull();
    // items 生成的结构不存在
    expect(container.querySelector('.m-breadcrumb-item')).toBeNull();
    expect(container.querySelector('.m-breadcrumb-separator')).toBeNull();
  });

  // --- 单项（无分隔符）---
  it('只有一个 item 时不渲染分隔符', async () => {
    const { container } = render(MBreadcrumb, {
      props: { items: [{ label: '首页' }] },
    });

    const separators = container.querySelectorAll('.m-breadcrumb-separator');
    expect(separators.length).toBe(0);
  });
});
