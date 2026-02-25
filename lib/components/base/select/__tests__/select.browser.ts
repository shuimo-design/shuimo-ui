/**
 * @description lib select 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MSelect from '../MSelect';

const simpleOptions = ['苹果', '香蕉', '橙子', '葡萄'];

describe('MSelect browser', () => {
  it('渲染 select 结构', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions },
    });

    expect(container.querySelector('.m-select')).not.toBeNull();
  });

  it('显示 placeholder', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions, placeholder: '请选择水果' },
    });

    // MInput 内部包含原生 input 元素
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('请选择水果');
  });

  it('点击打开下拉', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions },
    });

    // 点击 popover 的 active 区域（.m-popover-default-wrapper）
    const active = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    expect(active).not.toBeNull();
    active.click();
    await nextTick();
    await nextTick();

    // 选项渲染在 popover content 区域
    const options = container.querySelectorAll('.m-option');
    expect(options.length).toBeGreaterThan(0);
  });

  it('单选点击选项触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: '',
        options: simpleOptions,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const active = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    active.click();
    await nextTick();
    await nextTick();

    const options = container.querySelectorAll('.m-option');
    expect(options.length).toBeGreaterThan(0);
    (options[0] as HTMLElement).click();
    await nextTick();

    expect(onUpdate).toHaveBeenCalledWith('苹果');
  });

  it('disabled 时 input 为 disabled 状态', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions, disabled: true },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.disabled).toBe(true);
  });
});
