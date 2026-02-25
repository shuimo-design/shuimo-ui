/**
 * @description headless Confirm 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MConfirm from '../MConfirm';

describe('MConfirm browser', () => {
  it('默认不渲染确认框（visible=false）', async () => {
    render(MConfirm, {
      props: { visible: false, content: '确认删除吗？' },
    });

    await nextTick();
    const confirm = document.body.querySelector('.m-confirm');
    expect(confirm).toBeNull();
  });

  it('visible=true 时渲染 m-confirm 到 body', async () => {
    render(MConfirm, {
      props: { visible: true, content: '确认删除吗？' },
    });

    await nextTick();
    const confirm = document.body.querySelector('.m-confirm');
    expect(confirm).not.toBeNull();
  });

  it('content prop 文本正确渲染到 m-confirm-content', async () => {
    render(MConfirm, {
      props: { visible: true, content: '确认删除吗？' },
    });

    await nextTick();
    const content = document.body.querySelector('.m-confirm-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('确认删除吗？');
  });

  it('default slot 优先于 content prop 渲染', async () => {
    render(MConfirm, {
      props: { visible: true, content: 'prop内容' },
      slots: { default: () => 'slot内容' },
    });

    await nextTick();
    const content = document.body.querySelector('.m-confirm-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('slot内容');
  });

  it('默认渲染确认和取消按钮', async () => {
    render(MConfirm, {
      props: { visible: true, content: '确认操作' },
    });

    await nextTick();
    const okBtn = document.body.querySelector('.m-confirm-ok');
    const cancelBtn = document.body.querySelector('.m-confirm-cancel');
    expect(okBtn).not.toBeNull();
    expect(cancelBtn).not.toBeNull();
    expect(okBtn!.textContent).toBe('确定');
    expect(cancelBtn!.textContent).toBe('取消');
  });

  it('confirmText / cancelText 自定义按钮文案', async () => {
    render(MConfirm, {
      props: {
        visible: true,
        content: '确认操作',
        confirmText: '删除',
        cancelText: '返回',
      },
    });

    await nextTick();
    const okBtn = document.body.querySelector('.m-confirm-ok');
    const cancelBtn = document.body.querySelector('.m-confirm-cancel');
    expect(okBtn!.textContent).toBe('删除');
    expect(cancelBtn!.textContent).toBe('返回');
  });

  it('点击确认按钮触发 confirm 事件并关闭', async () => {
    const onConfirm = vi.fn();
    const onUpdate = vi.fn();
    render(MConfirm, {
      props: {
        visible: true,
        content: '确认操作',
        onConfirm,
        'onUpdate:visible': onUpdate,
      },
    });

    await nextTick();
    const okBtn = document.body.querySelector('.m-confirm-ok') as HTMLElement;
    expect(okBtn).not.toBeNull();
    okBtn.click();
    expect(onConfirm).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  it('点击取消按钮触发 cancel 事件并关闭', async () => {
    const onCancel = vi.fn();
    const onUpdate = vi.fn();
    render(MConfirm, {
      props: {
        visible: true,
        content: '确认操作',
        onCancel,
        'onUpdate:visible': onUpdate,
      },
    });

    await nextTick();
    const cancelBtn = document.body.querySelector('.m-confirm-cancel') as HTMLElement;
    expect(cancelBtn).not.toBeNull();
    cancelBtn.click();
    expect(onCancel).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  it('渲染遮罩层 m-model-mask', async () => {
    render(MConfirm, {
      props: { visible: true, content: '确认操作' },
    });

    await nextTick();
    const mask = document.body.querySelector('.m-model-mask');
    expect(mask).not.toBeNull();
  });
});
