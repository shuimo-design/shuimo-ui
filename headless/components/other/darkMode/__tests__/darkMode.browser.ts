/**
 * @description headless dark mode 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi, afterEach } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDarkMode from '../MDarkMode';

describe('MDarkMode browser', () => {
  afterEach(() => {
    // 每个用例后清理 html[dark] 属性，避免测试间干扰
    document.documentElement.removeAttribute('dark');
  });

  it('渲染 m-dark-mode 根节点', () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: false },
    });

    const root = container.firstElementChild as HTMLElement;
    expect(root).not.toBeNull();
    expect(root.classList.contains('m-dark-mode')).toBe(true);
  });

  it('无 slot 时渲染文字内容', () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: false },
    });

    expect(container.textContent).toBeTruthy();
  });

  it('light 模式文字为 Light', () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: false },
    });

    expect(container.textContent).toContain('Light');
  });

  it('dark 模式文字为 Dark', () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: true },
    });

    expect(container.textContent).toContain('Dark');
  });

  it('点击触发 update:modelValue(true)', () => {
    const onUpdate = vi.fn();
    const { container } = render(MDarkMode, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    });

    const root = container.firstElementChild as HTMLElement;
    root.click();
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('点击从 dark 切回 light 触发 update:modelValue(false)', () => {
    const onUpdate = vi.fn();
    const { container } = render(MDarkMode, {
      props: { modelValue: true, 'onUpdate:modelValue': onUpdate },
    });

    const root = container.firstElementChild as HTMLElement;
    root.click();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });
});
