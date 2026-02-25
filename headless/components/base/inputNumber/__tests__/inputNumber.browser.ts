/**
 * @description headless inputNumber 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MInputNumber from '../MInputNumber';

describe('MInputNumber browser', () => {
  it('渲染并显示初始值', async () => {
    const screen = render(MInputNumber, {
      props: { modelValue: 42 },
    });

    const input = screen.getByRole('textbox');
    await expect.element(input).toHaveValue('42');
  });

  it('输入数字触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const screen = render(MInputNumber, {
      props: { modelValue: 0, 'onUpdate:modelValue': onUpdate },
    });

    const input = screen.getByRole('textbox');
    // 清空后输入
    await input.fill('123');
    expect(onUpdate).toHaveBeenCalled();
  });

  it('超过 max 值时截断', async () => {
    const onUpdate = vi.fn();
    const screen = render(MInputNumber, {
      props: { modelValue: 0, max: 10, 'onUpdate:modelValue': onUpdate },
    });

    const input = screen.getByRole('textbox');
    await input.fill('99');
    // 最后一次 emit 的值应该是 max
    const lastCall = onUpdate.mock.calls[onUpdate.mock.calls.length - 1];
    expect(+lastCall[0]).toBeLessThanOrEqual(10);
  });

  it('非数字输入被拒绝', async () => {
    const onUpdate = vi.fn();
    const screen = render(MInputNumber, {
      props: { modelValue: 5, 'onUpdate:modelValue': onUpdate },
    });

    const input = screen.getByRole('textbox');
    await input.fill('abc');
    // 非法输入不应更新 modelValue 为 abc
    const calls = onUpdate.mock.calls;
    calls.forEach(call => {
      expect(call[0]).not.toBe('abc');
    });
  });
});
