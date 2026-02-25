/**
 * @description headless checkbox 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MCheckbox from '../MCheckbox';

describe('MCheckbox browser', () => {
  it('渲染 checkbox 并显示 label 文本', async () => {
    const screen = render(MCheckbox, {
      props: { label: '同意协议' },
    });

    await expect.element(screen.getByText('同意协议')).toBeInTheDocument();
    await expect.element(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('点击切换选中状态并触发事件', async () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { container } = render(MCheckbox, {
      props: {
        label: '测试',
        'onChange': onChange,
        'onUpdate:modelValue': onUpdate,
      },
    });

    // 点击 checkbox 容器（div.m-checkbox）
    const el = container.querySelector('.m-checkbox') as HTMLElement;
    expect(el).not.toBeNull();
    el.click();
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('使用 slot 替代 label', async () => {
    const screen = render(MCheckbox, {
      slots: { default: () => '自定义内容' },
    });

    await expect.element(screen.getByText('自定义内容')).toBeInTheDocument();
  });

  it('disabled 状态下点击不切换', async () => {
    const onChange = vi.fn();
    const { container } = render(MCheckbox, {
      props: { label: '禁用', disabled: true, onChange },
    });

    const el = container.querySelector('.m-checkbox') as HTMLElement;
    el.click();
    expect(onChange).not.toHaveBeenCalled();
  });
});
