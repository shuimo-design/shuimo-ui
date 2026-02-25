/**
 * @description headless input 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MInput from '../MInput';

describe('MInput browser', () => {
  it('渲染 input 元素', async () => {
    const screen = render(MInput, {
      props: { modelValue: '' },
    });

    await expect.element(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('显示 placeholder', async () => {
    const { container } = render(MInput, {
      props: { modelValue: '', placeholder: '请输入' },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('请输入');
  });

  it('输入触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MInput, {
      props: { modelValue: '', 'onUpdate:modelValue': onUpdate },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    // 模拟 input 事件
    const nativeInputEvent = new InputEvent('input', { bubbles: true });
    Object.defineProperty(nativeInputEvent, 'target', { value: { value: 'hello' } });
    input.dispatchEvent(nativeInputEvent);
    expect(onUpdate).toHaveBeenCalled();
  });

  it('disabled 属性正确传递', async () => {
    const { container } = render(MInput, {
      props: { modelValue: '', disabled: true },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
