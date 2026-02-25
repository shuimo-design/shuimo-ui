/**
 * @description headless select 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 15:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MSelect from '../MSelect';

const simpleOptions = ['苹果', '香蕉', '橙子', '葡萄', '西瓜'];
const objectOptions = [
  { id: 1, name: '苹果', label: 'Apple' },
  { id: 2, name: '香蕉', label: 'Banana' },
  { id: 3, name: '橙子', label: 'Orange' },
];

describe('MSelect browser', () => {
  // --- 基础渲染 ---
  it('渲染 select 结构', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions },
    });

    expect(container.querySelector('.m-select')).not.toBeNull();
    expect(container.querySelector('.m-select-trigger')).not.toBeNull();
    expect(container.querySelector('.m-select-input')).not.toBeNull();
  });

  it('显示 placeholder', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions, placeholder: '请选择水果' },
    });

    const input = container.querySelector('.m-select-input') as HTMLInputElement;
    expect(input.placeholder).toBe('请选择水果');
  });

  // --- 单选 ---
  it('点击 trigger 打开下拉', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions },
    });

    const trigger = container.querySelector('.m-select-trigger') as HTMLElement;
    trigger.click();
    await nextTick();
    await nextTick();

    // dropdown 通过 Teleport 到 body
    const dropdown = document.querySelector('.m-select-dropdown');
    expect(dropdown).not.toBeNull();

    const options = document.querySelectorAll('.m-option');
    expect(options.length).toBe(5);
  });

  it('单选点击选项触发 update:modelValue 并关闭', async () => {
    const onUpdate = vi.fn();
    const onSelectEvent = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: '',
        options: simpleOptions,
        'onUpdate:modelValue': onUpdate,
        onSelect: onSelectEvent,
      },
    });

    // 打开
    const trigger = container.querySelector('.m-select-trigger') as HTMLElement;
    trigger.click();
    await nextTick();
    await nextTick();

    // 点击第二个选项
    const options = document.querySelectorAll('.m-option');
    (options[1] as HTMLElement).click();
    await nextTick();

    expect(onUpdate).toHaveBeenCalledWith('香蕉');
    expect(onSelectEvent).toHaveBeenCalled();

    // 下拉应该关闭
    await nextTick();
    const dropdown = document.querySelector('.m-select-dropdown');
    expect(dropdown).toBeNull();
  });

  it('对象选项使用 valueParam 和 optionParam', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: '',
        options: objectOptions,
        valueParam: 'id',
        optionParam: 'name',
        inputParam: 'name',
        'onUpdate:modelValue': onUpdate,
      },
    });

    // 打开
    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    // 检查选项显示的是 name 字段
    const opts = document.querySelectorAll('.m-option');
    expect(opts[0].textContent).toBe('苹果');
    expect(opts[1].textContent).toBe('香蕉');

    // 选中第一个
    (opts[0] as HTMLElement).click();
    await nextTick();

    // modelValue 应该是 id
    expect(onUpdate).toHaveBeenCalledWith(1);
  });

  it('modelValue 初始值同步到 input 显示', async () => {
    const { container } = render(MSelect, {
      props: {
        modelValue: 2,
        options: objectOptions,
        valueParam: 'id',
        inputParam: 'name',
      },
    });

    await nextTick();
    const input = container.querySelector('.m-select-input') as HTMLInputElement;
    expect(input.value).toBe('香蕉');
  });

  it('选中项有 m-option-selected 类', async () => {
    const { container } = render(MSelect, {
      props: {
        modelValue: '橙子',
        options: simpleOptions,
      },
    });

    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const selected = document.querySelector('.m-option-selected');
    expect(selected).not.toBeNull();
    expect(selected!.textContent).toBe('橙子');
  });

  // --- disabled ---
  it('disabled 时点击不打开下拉', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: simpleOptions, disabled: true },
    });

    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const dropdown = document.querySelector('.m-select-dropdown');
    expect(dropdown).toBeNull();
  });

  // --- 空数据 ---
  it('无选项时显示空状态', async () => {
    const { container } = render(MSelect, {
      props: { modelValue: '', options: [] },
    });

    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const empty = document.querySelector('.m-select-empty');
    expect(empty).not.toBeNull();
    expect(empty!.textContent).toContain('暂无数据');
  });

  // --- 多选 ---
  it('多选模式渲染 tags', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: ['苹果', '橙子'],
        options: simpleOptions,
        multiple: true,
        'onUpdate:modelValue': onUpdate,
      },
    });

    await nextTick();

    // 应有两个 tag
    const tags = container.querySelectorAll('.m-select-tag');
    expect(tags.length).toBe(2);
    expect(tags[0].querySelector('.m-select-tag-text')!.textContent).toBe('苹果');
    expect(tags[1].querySelector('.m-select-tag-text')!.textContent).toBe('橙子');
  });

  it('多选点击选项切换选中', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: ['苹果'],
        options: simpleOptions,
        multiple: true,
        'onUpdate:modelValue': onUpdate,
      },
    });

    // 打开
    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    // 点击 '香蕉' (index 1)
    const opts = document.querySelectorAll('.m-option');
    (opts[1] as HTMLElement).click();
    await nextTick();

    // 应该追加
    expect(onUpdate).toHaveBeenCalledWith(['苹果', '香蕉']);

    // 多选点击后不关闭下拉
    const dropdown = document.querySelector('.m-select-dropdown');
    expect(dropdown).not.toBeNull();
  });

  it('多选删除 tag', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSelect, {
      props: {
        modelValue: ['苹果', '橙子'],
        options: simpleOptions,
        multiple: true,
        'onUpdate:modelValue': onUpdate,
      },
    });

    await nextTick();

    // 点击第一个 tag 的关闭按钮
    const closeBtn = container.querySelector('.m-select-tag-close') as HTMLElement;
    closeBtn.click();
    await nextTick();

    expect(onUpdate).toHaveBeenCalledWith(['橙子']);
  });

  // --- filter ---
  it('非只读模式下输入触发过滤', async () => {
    const { container } = render(MSelect, {
      props: {
        modelValue: '',
        options: objectOptions,
        optionParam: 'name',
        inputParam: 'name',
        readonly: false,
      },
    });

    // 打开
    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    // 所有选项都显示
    let opts = document.querySelectorAll('.m-option');
    expect(opts.length).toBe(3);

    // 输入过滤
    const input = container.querySelector('.m-select-input') as HTMLInputElement;
    input.value = '苹';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    await nextTick();

    // 只剩匹配项
    opts = document.querySelectorAll('.m-option');
    expect(opts.length).toBe(1);
    expect(opts[0].textContent).toBe('苹果');
  });

  // --- toMatch 自定义匹配 ---
  it('toMatch 自定义匹配选中项', async () => {
    const { container } = render(MSelect, {
      props: {
        modelValue: { id: 2 },
        options: objectOptions,
        optionParam: 'name',
        inputParam: 'name',
        toMatch: (option: { id: number }, value: { id: number }) => option.id === value?.id,
      },
    });

    await nextTick();

    // input 应该显示匹配项
    const input = container.querySelector('.m-select-input') as HTMLInputElement;
    expect(input.value).toBe('香蕉');

    // 打开后检查选中状态
    (container.querySelector('.m-select-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const selected = document.querySelector('.m-option-selected');
    expect(selected).not.toBeNull();
    expect(selected!.textContent).toBe('香蕉');
  });
});
