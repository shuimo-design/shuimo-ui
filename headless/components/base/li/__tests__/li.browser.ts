/**
 * @description headless Li 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MLi from '../MLi';

describe('MLi browser', () => {
  it('渲染 li 元素并包含 m-li 类名', () => {
    const { container } = render(MLi, {
      slots: { default: () => '列表项' },
    });

    const el = container.querySelector('li.m-li');
    expect(el).not.toBeNull();
  });

  it('默认不含 m-li-active 类名', () => {
    const { container } = render(MLi, {
      slots: { default: () => '列表项' },
    });

    const el = container.querySelector('.m-li');
    expect(el!.classList.contains('m-li-active')).toBe(false);
  });

  it('active 为 true 时包含 m-li-active 类名', () => {
    const { container } = render(MLi, {
      props: { active: true },
      slots: { default: () => '激活项' },
    });

    const el = container.querySelector('.m-li');
    expect(el!.classList.contains('m-li-active')).toBe(true);
  });

  it('渲染默认插槽内容到 m-li-inner 中', () => {
    const { container } = render(MLi, {
      slots: { default: () => '内容文字' },
    });

    const inner = container.querySelector('.m-li-inner');
    expect(inner).not.toBeNull();
    expect(inner!.textContent).toBe('内容文字');
  });

  it('marker 为 true 时渲染 m-marker 元素', () => {
    const { container } = render(MLi, {
      props: { marker: true },
      slots: { default: () => '有标记的项' },
    });

    const marker = container.querySelector('.m-marker');
    expect(marker).not.toBeNull();
  });

  it('marker 为 false 时不渲染 m-marker 元素', () => {
    const { container } = render(MLi, {
      props: { marker: false },
      slots: { default: () => '无标记的项' },
    });

    const marker = container.querySelector('.m-marker');
    expect(marker).toBeNull();
  });

  it('marker 插槽内容渲染在 m-marker 中', () => {
    const { container } = render(MLi, {
      props: { marker: true },
      slots: {
        default: () => '主要内容',
        marker: () => '•',
      },
    });

    const marker = container.querySelector('.m-marker');
    expect(marker).not.toBeNull();
    expect(marker!.textContent).toBe('•');
  });
});
