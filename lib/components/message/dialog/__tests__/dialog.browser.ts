/**
 * @description lib dialog 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MDialog from '../MDialog';

describe('lib MDialog browser', () => {
  it('默认不渲染弹窗内容（visible=false）', async () => {
    render(MDialog, {
      props: { visible: false },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const dialog = document.body.querySelector('.m-dialog');
    expect(dialog).toBeNull();
  });

  it('visible=true 时渲染 m-dialog 到 body', async () => {
    render(MDialog, {
      props: { visible: true },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const dialog = document.body.querySelector('.m-dialog');
    expect(dialog).not.toBeNull();
  });

  it('visible=true 时渲染遮罩层 m-model-mask', async () => {
    render(MDialog, {
      props: { visible: true },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const mask = document.body.querySelector('.m-model-mask');
    expect(mask).not.toBeNull();
  });

  it('默认显示关闭按钮 m-model-close-btn', async () => {
    render(MDialog, {
      props: { visible: true },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const closeBtn = document.body.querySelector('.m-model-close-btn');
    expect(closeBtn).not.toBeNull();
  });

  it('closeBtn=false 时不渲染关闭按钮', async () => {
    render(MDialog, {
      props: { visible: true, closeBtn: false },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const closeBtn = document.body.querySelector('.m-model-close-btn');
    expect(closeBtn).toBeNull();
  });

  it('active slot 渲染触发区域 m-model-active', async () => {
    const { container } = render(MDialog, {
      props: { visible: false },
      slots: {
        default: () => '弹窗内容',
        active: () => '打开弹窗',
      },
    });

    const active = container.querySelector('.m-model-active');
    expect(active).not.toBeNull();
    expect(active!.textContent).toBe('打开弹窗');
  });

  it('点击 active 区域打开弹窗', async () => {
    const { container } = render(MDialog, {
      props: { visible: false },
      slots: {
        default: () => '弹窗内容',
        active: () => '打开弹窗',
      },
    });

    const active = container.querySelector('.m-model-active') as HTMLElement;
    expect(active).not.toBeNull();
    active.click();
    await nextTick();

    const dialog = document.body.querySelector('.m-dialog');
    expect(dialog).not.toBeNull();
  });

  it('点击关闭按钮触发 update:visible(false)', async () => {
    const onUpdate = vi.fn();
    render(MDialog, {
      props: { visible: true, 'onUpdate:visible': onUpdate },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const closeBtn = document.body.querySelector('.m-model-close-btn') as HTMLElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });

  it('点击遮罩关闭弹窗（默认 clickClose=true）', async () => {
    const onUpdate = vi.fn();
    render(MDialog, {
      props: { visible: true, 'onUpdate:visible': onUpdate },
      slots: { default: () => '弹窗内容' },
    });

    await nextTick();
    const mask = document.body.querySelector('.m-model-mask') as HTMLElement;
    expect(mask).not.toBeNull();
    mask.click();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });
});
