/**
 * @description lib radio 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MRadio from '../MRadio';

describe('MRadio browser', () => {
  it('渲染单选框', async () => {
    const { container } = render(MRadio, {
      props: { label: '选项' },
    });

    const el = container.querySelector('.m-radio');
    expect(el).not.toBeNull();
  });

  it('label 显示正确文本', async () => {
    const screen = render(MRadio, {
      props: { label: '单选项A' },
    });

    await expect.element(screen.getByText('单选项A')).toBeInTheDocument();
  });

  it('点击触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MRadio, {
      props: { label: '测试', 'onUpdate:modelValue': onUpdate },
    });

    const input = container.querySelector('.m-radio-input') as HTMLInputElement;
    expect(input).not.toBeNull();
    input.click();
    expect(onUpdate).toHaveBeenCalled();
  });
});
