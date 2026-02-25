/**
 * @description lib checkbox 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MCheckbox from '../MCheckbox';

describe('MCheckbox browser', () => {
  it('渲染复选框', async () => {
    const { container } = render(MCheckbox, {
      props: { label: '选项' },
    });

    const el = container.querySelector('.m-checkbox');
    expect(el).not.toBeNull();
  });

  it('label 显示正确文本', async () => {
    const screen = render(MCheckbox, {
      props: { label: '选项A' },
    });

    await expect.element(screen.getByText('选项A')).toBeInTheDocument();
  });

  it('点击切换触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MCheckbox, {
      props: { label: '测试', 'onUpdate:modelValue': onUpdate },
    });

    const el = container.querySelector('.m-checkbox') as HTMLElement;
    expect(el).not.toBeNull();
    el.click();
    expect(onUpdate).toHaveBeenCalled();
  });

  it('disabled 状态包含 m-disabled 类名', async () => {
    const { container } = render(MCheckbox, {
      props: { label: '禁用', disabled: true },
    });

    const el = container.querySelector('.m-checkbox');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-disabled')).toBe(true);
  });
});
