/**
 * @description headless Loading 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MLoading from '../MLoading';

describe('MLoading browser', () => {
  it('渲染包含 m-loading 容器', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: true },
    });

    const el = container.querySelector('.m-loading');
    expect(el).not.toBeNull();
  });

  it('modelValue 为 true 时元素可见', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: true },
    });

    const el = container.querySelector('.m-loading') as HTMLElement;
    expect(el).not.toBeNull();
    // v-show 为 true 时 display 不为 none
    expect(el.style.display).not.toBe('none');
  });

  it('modelValue 为 false 时元素隐藏', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: false },
    });

    const el = container.querySelector('.m-loading') as HTMLElement;
    expect(el).not.toBeNull();
    // v-show 为 false 时 display 为 none
    expect(el.style.display).toBe('none');
  });

  it('slot 内容正确渲染', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: true },
      slots: { default: () => h('span', { class: 'test-content' }, '加载中...') },
    });

    const content = container.querySelector('.m-loading .test-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('加载中...');
  });

  it('modelValue 为 false 时 slot 内容仍在 DOM 中但不可见', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: false },
      slots: { default: () => h('span', { class: 'hidden-content' }, '内容') },
    });

    const el = container.querySelector('.m-loading') as HTMLElement;
    // 元素存在于 DOM 但被 v-show 隐藏
    expect(el).not.toBeNull();
    expect(el.style.display).toBe('none');
    expect(container.querySelector('.hidden-content')).not.toBeNull();
  });

  it('无 slot 时 loading 容器仍正常渲染', async () => {
    const { container } = render(MLoading, {
      props: { modelValue: true },
    });

    const el = container.querySelector('.m-loading');
    expect(el).not.toBeNull();
  });
});
