/**
 * @description lib confirm 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import MConfirm from '../MConfirm';

describe('lib MConfirm browser', () => {
  it('默认不渲染确认框（未调用时）', async () => {
    const confirm = document.body.querySelector('.m-confirm');
    expect(confirm).toBeNull();
  });

  it('调用后渲染 m-confirm 到 body', async () => {
    // 不 await Promise，仅触发渲染
    MConfirm('确认删除吗？');
    await nextTick();

    const confirm = document.body.querySelector('.m-confirm');
    expect(confirm).not.toBeNull();

    // 清理：点击取消
    const cancelBtn = document.body.querySelector('button:last-of-type') as HTMLElement | null;
    cancelBtn?.click();
  });

  it('渲染 content 文本内容', async () => {
    MConfirm('这是确认内容');
    await nextTick();

    const inner = document.body.querySelector('.m-confirm-inner');
    expect(inner).not.toBeNull();
    expect(inner!.textContent).toContain('这是确认内容');

    // 清理
    const cancelBtn = document.body.querySelector('.m-confirm button:last-of-type') as HTMLElement | null;
    cancelBtn?.click();
  });

  it('默认渲染确认和取消按钮', async () => {
    MConfirm('确认操作');
    await nextTick();

    const confirmEl = document.body.querySelector('.m-confirm');
    expect(confirmEl).not.toBeNull();

    // 使用 MButton，按钮文案为 '确定' 和 '取消'
    const buttons = document.body.querySelectorAll('.m-confirm .m-button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    const texts = Array.from(buttons).map(b => b.textContent?.trim());
    expect(texts).toContain('确定');
    expect(texts).toContain('取消');

    // 清理
    const cancelBtn = Array.from(buttons).find(b => b.textContent?.trim() === '取消') as HTMLElement | undefined;
    cancelBtn?.click();
  });

  it('点击确认按钮 Promise resolve true', async () => {
    const promise = MConfirm('是否确认？');
    await nextTick();

    const buttons = document.body.querySelectorAll('.m-confirm .m-button');
    const confirmBtn = Array.from(buttons).find(b => b.textContent?.trim() === '确定') as HTMLElement | undefined;
    expect(confirmBtn).not.toBeUndefined();
    confirmBtn!.click();

    const result = await promise;
    expect(result).toBe(true);
  });

  it('点击取消按钮 Promise resolve false', async () => {
    const promise = MConfirm('是否取消？');
    await nextTick();

    const buttons = document.body.querySelectorAll('.m-confirm .m-button');
    const cancelBtn = Array.from(buttons).find(b => b.textContent?.trim() === '取消') as HTMLElement | undefined;
    expect(cancelBtn).not.toBeUndefined();
    cancelBtn!.click();

    const result = await promise;
    expect(result).toBe(false);
  });

  it('渲染遮罩层 m-model-mask', async () => {
    MConfirm('确认操作');
    await nextTick();

    const mask = document.body.querySelector('.m-model-mask');
    expect(mask).not.toBeNull();

    // 清理
    const buttons = document.body.querySelectorAll('.m-confirm .m-button');
    const cancelBtn = Array.from(buttons).find(b => b.textContent?.trim() === '取消') as HTMLElement | undefined;
    cancelBtn?.click();
  });
});
