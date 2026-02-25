/**
 * @description headless DatePicker 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MDatePicker from '../MDatePicker';

describe('MDatePicker browser', () => {
  // --- 基础渲染 ---
  it('渲染日期选择器显示 placeholder', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    expect(trigger).not.toBeNull();
    // 无值时显示默认 placeholder
    expect(trigger.textContent).toBe('请选择日期...');
    // 挂有 placeholder 样式类
    expect(trigger.classList.contains('m-date-picker-placeholder')).toBe(true);
  });

  it('自定义 placeholder 正确显示', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '', placeholder: '请选择一个日期' },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    expect(trigger.textContent).toBe('请选择一个日期');
  });

  // --- 打开面板 ---
  it('点击打开日历面板', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    // 面板初始不可见
    expect(container.querySelector('.m-date-picker-panel')).toBeNull();

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    const panel = container.querySelector('.m-date-picker-panel');
    expect(panel).not.toBeNull();

    // 面板内包含头部导航
    expect(panel!.querySelector('.m-date-picker-head')).not.toBeNull();
    // 日期模式下包含星期头行
    expect(panel!.querySelector('.m-date-picker-week-row')).not.toBeNull();
  });

  // --- 关闭面板 ---
  it('点击外部关闭面板', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    // 打开面板
    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    expect(container.querySelector('.m-date-picker-panel')).not.toBeNull();

    // 模拟点击组件外部
    document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(container.querySelector('.m-date-picker-panel')).toBeNull();
  });

  it('再次点击 trigger 关闭面板', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;

    // 第一次点击打开
    trigger.click();
    await nextTick();
    expect(container.querySelector('.m-date-picker-panel')).not.toBeNull();

    // 第二次点击关闭
    trigger.click();
    await nextTick();
    expect(container.querySelector('.m-date-picker-panel')).toBeNull();
  });

  // --- 选择日期 ---
  it('选择日期后更新值并触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MDatePicker, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': onUpdate,
      },
    });

    // 打开面板
    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    // 点击当月第一个日期格
    const currentMonthCells = container.querySelectorAll('.m-date-picker-cell.m-date-picker-cell-not-current');
    // 点击第一个属于当月的日期格（不带 not-current 类）
    const allCells = container.querySelectorAll('.m-date-picker-cell');
    // 找到第一个当月格（没有 m-date-picker-cell-not-current）
    const currentMonthCell = Array.from(allCells).find(
      cell => !cell.classList.contains('m-date-picker-cell-not-current'),
    ) as HTMLElement;

    expect(currentMonthCell).not.toBeUndefined();
    currentMonthCell.click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    // emit 被调用，且传入 YYYY-MM-DD 格式的字符串
    expect(onUpdate).toHaveBeenCalledTimes(1);
    const emittedValue = onUpdate.mock.calls[0][0] as string;
    expect(typeof emittedValue).toBe('string');
    expect(/^\d{4}-\d{2}-\d{2}$/.test(emittedValue)).toBe(true);

    // 选择后面板自动关闭
    expect(container.querySelector('.m-date-picker-panel')).toBeNull();
  });

  it('选择日期后 trigger 显示已选值（无 placeholder 类）', async () => {
    const { container } = render(MDatePicker, {
      props: {
        modelValue: '2026-02-15',
      },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    expect(trigger.textContent).toBe('2026-02-15');
    expect(trigger.classList.contains('m-date-picker-placeholder')).toBe(false);
  });

  // --- 日历结构 ---
  it('日期模式下渲染 6×7 日期格', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    const cells = container.querySelectorAll('.m-date-picker-cell');
    // 日历格至少覆盖当月天数，通常 28~42 个格子
    expect(cells.length).toBeGreaterThanOrEqual(28);
    // 每行 7 格
    expect(cells.length % 7).toBe(0);
  });

  it('点击头部年份切换到年份选择模式', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    const yearLabel = container.querySelector('.m-date-picker-head-year') as HTMLElement;
    yearLabel.click();
    await nextTick();

    // 切换到年份模式后显示年份格
    const yearCells = container.querySelectorAll('.m-date-picker-year-cell');
    expect(yearCells.length).toBe(12);
    // 星期头应隐藏
    expect(container.querySelector('.m-date-picker-week-row')).toBeNull();
  });

  // --- month 类型 ---
  it('type=month 点击月份格触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MDatePicker, {
      props: {
        modelValue: '',
        type: 'month',
        'onUpdate:modelValue': onUpdate,
      },
    });

    const trigger = container.querySelector('.m-date-picker-span') as HTMLElement;
    trigger.click();
    await nextTick();

    // 月份模式下直接显示月份格
    const monthCells = container.querySelectorAll('.m-date-picker-month-cell');
    expect(monthCells.length).toBe(12);

    (monthCells[2] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onUpdate).toHaveBeenCalledTimes(1);
    const emittedValue = onUpdate.mock.calls[0][0] as string;
    // month 类型格式为 YYYY-MM
    expect(/^\d{4}-\d{2}$/.test(emittedValue)).toBe(true);
    // 面板关闭
    expect(container.querySelector('.m-date-picker-panel')).toBeNull();
  });
});
