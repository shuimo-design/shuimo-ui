/**
 * @description headless switch 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MSwitch from '../MSwitch';

describe('MSwitch browser', () => {
  it('默认渲染并包含 switch 结构', async () => {
    const { container } = render(MSwitch, {
      props: { modelValue: false },
    });

    const el = container.querySelector('.m-switch');
    expect(el).not.toBeNull();
    expect(el!.querySelector('.m-switch-main')).not.toBeNull();
    expect(el!.querySelector('.m-switch-core')).not.toBeNull();
  });

  it('点击切换 active 状态', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSwitch, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    });

    const main = container.querySelector('.m-switch-main') as HTMLElement;
    expect(main).not.toBeNull();
    main.click();
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('active 状态下有 m-switch-active 类名', async () => {
    const { container } = render(MSwitch, {
      props: { modelValue: true },
    });

    const el = container.querySelector('.m-switch');
    expect(el!.classList.contains('m-switch-active')).toBe(true);
  });

  it('disabled 状态下点击不触发事件', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSwitch, {
      props: { modelValue: false, disabled: true, 'onUpdate:modelValue': onUpdate },
    });

    const main = container.querySelector('.m-switch-main') as HTMLElement;
    main.click();
    expect(onUpdate).not.toHaveBeenCalled();
  });
});
