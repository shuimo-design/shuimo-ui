/**
 * @description headless form / form-item 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MForm from '../MForm';
import MFormItem from '../MFormItem';

// ─────────────────────────────────────────────
// MForm
// ─────────────────────────────────────────────

describe('MForm browser', () => {
  it('渲染 form 元素并带有 m-form class', async () => {
    const { container } = render(MForm, {
      slots: { default: () => '表单内容' },
    });
    const form = container.querySelector('form.m-form');
    expect(form).not.toBeNull();
  });

  it('默认模式不包含 m-form-inline class', async () => {
    const { container } = render(MForm, {
      slots: { default: () => '表单内容' },
    });
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    expect(form!.classList.contains('m-form-inline')).toBe(false);
  });

  it('inline=true 时添加 m-form-inline class', async () => {
    const { container } = render(MForm, {
      props: { inline: true },
      slots: { default: () => '行内表单' },
    });
    const form = container.querySelector('form.m-form-inline');
    expect(form).not.toBeNull();
  });

  it('inline=true 时同时保留 m-form class', async () => {
    const { container } = render(MForm, {
      props: { inline: true },
      slots: { default: () => '行内表单' },
    });
    const form = container.querySelector('form');
    expect(form!.classList.contains('m-form')).toBe(true);
    expect(form!.classList.contains('m-form-inline')).toBe(true);
  });

  it('submit=false 时提交事件被阻止默认行为', async () => {
    const { container } = render(MForm, {
      props: { submit: false },
      slots: { default: () => h('button', { type: 'submit' }, '提交') },
    });
    const form = container.querySelector('form') as HTMLFormElement;
    const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
    form.dispatchEvent(submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it('submit=true 时提交事件不阻止默认行为', async () => {
    const { container } = render(MForm, {
      props: { submit: true },
      slots: { default: () => h('button', { type: 'submit' }, '提交') },
    });
    const form = container.querySelector('form') as HTMLFormElement;
    const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
    form.dispatchEvent(submitEvent);
    expect(submitEvent.defaultPrevented).toBe(false);
  });

  it('slot 内容正确渲染到 form 内部', async () => {
    const screen = render(MForm, {
      slots: { default: () => '自定义表单内容' },
    });
    await expect.element(screen.getByText('自定义表单内容')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// MFormItem
// ─────────────────────────────────────────────

describe('MFormItem browser', () => {
  it('渲染带有 m-form-item class 的容器', async () => {
    const { container } = render(MFormItem, {
      props: { label: '用户名' },
      slots: { default: () => h('input') },
    });
    const item = container.querySelector('.m-form-item');
    expect(item).not.toBeNull();
  });

  it('通过 label prop 渲染标签文本', async () => {
    const screen = render(MFormItem, {
      props: { label: '用户名' },
      slots: { default: () => h('input') },
    });
    await expect.element(screen.getByText('用户名')).toBeInTheDocument();
  });

  it('label 元素带有 m-form-item-label class', async () => {
    const { container } = render(MFormItem, {
      props: { label: '邮箱' },
      slots: { default: () => h('input') },
    });
    const label = container.querySelector('label.m-form-item-label');
    expect(label).not.toBeNull();
  });

  it('prop 属性绑定到 label 的 for 属性', async () => {
    const { container } = render(MFormItem, {
      props: { label: '用户名', prop: 'username' },
      slots: { default: () => h('input', { id: 'username' }) },
    });
    const label = container.querySelector('label.m-form-item-label') as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.htmlFor).toBe('username');
  });

  it('内容区域带有 m-form-item-content class', async () => {
    const { container } = render(MFormItem, {
      props: { label: '密码' },
      slots: { default: () => h('input', { type: 'password' }) },
    });
    const content = container.querySelector('.m-form-item-content');
    expect(content).not.toBeNull();
  });

  it('default slot 内容渲染到 m-form-item-content 内', async () => {
    const { container } = render(MFormItem, {
      props: { label: '备注' },
      slots: { default: () => h('textarea', { class: 'test-textarea' }) },
    });
    const content = container.querySelector('.m-form-item-content');
    expect(content).not.toBeNull();
    expect(content!.querySelector('textarea.test-textarea')).not.toBeNull();
  });

  it('label slot 优先于 label prop', async () => {
    const screen = render(MFormItem, {
      props: { label: '会被覆盖' },
      slots: {
        label: () => '自定义标签',
        default: () => h('input'),
      },
    });
    await expect.element(screen.getByText('自定义标签')).toBeInTheDocument();
  });

  it('使用 label slot 时 label prop 文本不可见', async () => {
    const { container } = render(MFormItem, {
      props: { label: '会被覆盖' },
      slots: {
        label: () => '自定义标签',
        default: () => h('input'),
      },
    });
    // label prop 原始文本不应出现在 DOM 中
    expect(container.textContent).not.toContain('会被覆盖');
  });
});
