/**
 * @description headless radio 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MRadio from '../MRadio';

describe('MRadio browser', () => {
  it('渲染 radio 并显示 label', async () => {
    const screen = render(MRadio, {
      props: { label: '选项A', value: 'a' },
    });

    await expect.element(screen.getByText('选项A')).toBeInTheDocument();
    await expect.element(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('点击触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const screen = render(MRadio, {
      props: { label: '选项B', value: 'b', 'onUpdate:modelValue': onUpdate },
    });

    await screen.getByRole('radio').click();
    expect(onUpdate).toHaveBeenCalledWith('b');
  });

  it('使用 slot 自定义内容', async () => {
    const screen = render(MRadio, {
      props: { value: 'c' },
      slots: { default: () => '自定义Radio' },
    });

    await expect.element(screen.getByText('自定义Radio')).toBeInTheDocument();
  });
});
