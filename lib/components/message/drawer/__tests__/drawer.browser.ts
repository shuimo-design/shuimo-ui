/**
 * @description lib drawer 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MDrawer from '../MDrawer';

describe('lib MDrawer browser', () => {
  it('默认不渲染抽屉内容（visible=false）', async () => {
    render(MDrawer, {
      props: { visible: false },
      slots: { default: () => '抽屉内容' },
    });

    await nextTick();
    const drawer = document.body.querySelector('.m-drawer');
    expect(drawer).toBeNull();
  });

  it('visible=true 时渲染 m-drawer 到 body', async () => {
    render(MDrawer, {
      props: { visible: true },
      slots: { default: () => '抽屉内容' },
    });

    await nextTick();
    const drawer = document.body.querySelector('.m-drawer');
    expect(drawer).not.toBeNull();
  });

  it('默认方向为 right，包含 m-drawer-right 类名', async () => {
    render(MDrawer, {
      props: { visible: true },
      slots: { default: () => '抽屉内容' },
    });

    await nextTick();
    const drawer = document.body.querySelector('.m-drawer');
    expect(drawer).not.toBeNull();
    expect(drawer!.classList.contains('m-drawer-right')).toBe(true);
  });

  it('direction=left 时包含 m-drawer-left 类名', async () => {
    render(MDrawer, {
      props: { visible: true, direction: 'left' },
      slots: { default: () => '抽屉内容' },
    });

    await nextTick();
    const drawer = document.body.querySelector('.m-drawer');
    expect(drawer).not.toBeNull();
    expect(drawer!.classList.contains('m-drawer-left')).toBe(true);
  });

  it('active slot 渲染触发区域 m-model-active', async () => {
    const { container } = render(MDrawer, {
      props: { visible: false },
      slots: {
        default: () => '抽屉内容',
        active: () => '打开抽屉',
      },
    });

    const active = container.querySelector('.m-model-active');
    expect(active).not.toBeNull();
    expect(active!.textContent).toBe('打开抽屉');
  });

  it('点击 active 区域打开抽屉', async () => {
    const { container } = render(MDrawer, {
      props: { visible: false },
      slots: {
        default: () => '抽屉内容',
        active: () => '打开抽屉',
      },
    });

    const active = container.querySelector('.m-model-active') as HTMLElement;
    expect(active).not.toBeNull();
    active.click();
    await nextTick();

    const drawer = document.body.querySelector('.m-drawer');
    expect(drawer).not.toBeNull();
  });

  it('遮罩点击关闭抽屉（默认 clickClose=true）', async () => {
    const onUpdate = vi.fn();
    render(MDrawer, {
      props: { visible: true, 'onUpdate:visible': onUpdate },
      slots: { default: () => '抽屉内容' },
    });

    await nextTick();
    const mask = document.body.querySelector('.m-model-mask') as HTMLElement;
    expect(mask).not.toBeNull();
    mask.click();
    expect(onUpdate).toHaveBeenCalledWith(false);
  });
});
