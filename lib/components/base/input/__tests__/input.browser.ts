/**
 * @description lib input 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MInput from '../MInput';

describe('MInput browser', () => {
  it('渲染 input 元素', async () => {
    const { container } = render(MInput, {
      props: { modelValue: '' },
    });

    const wrapper = container.querySelector('.m-input');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.querySelector('input')).not.toBeNull();
  });

  it('显示 placeholder', async () => {
    const { container } = render(MInput, {
      props: { modelValue: '', placeholder: '请输入内容' },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('请输入内容');
  });

  it('输入触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MInput, {
      props: { modelValue: '', 'onUpdate:modelValue': onUpdate },
    });

    const input = container.querySelector('input') as HTMLInputElement;
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

  it('textarea 模式渲染 textarea 元素', async () => {
    const { container } = render(MInput, {
      props: { type: 'textarea', modelValue: '' },
    });

    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBeNull();
  });
});
