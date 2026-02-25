/**
 * @description lib switch 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MSwitch from '../MSwitch';

describe('MSwitch browser', () => {
  it('渲染开关', async () => {
    const { container } = render(MSwitch, {
      props: { modelValue: false },
    });

    const el = container.querySelector('.m-switch');
    expect(el).not.toBeNull();
  });

  it('初始激活状态包含 m-switch-active 类名', async () => {
    const { container } = render(MSwitch, {
      props: { modelValue: true },
    });

    const el = container.querySelector('.m-switch');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-switch-active')).toBe(true);
  });

  it('点击切换触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MSwitch, {
      props: { modelValue: false, 'onUpdate:modelValue': onUpdate },
    });

    const core = container.querySelector('.m-switch-core') as HTMLElement;
    expect(core).not.toBeNull();
    core.click();
    expect(onUpdate).toHaveBeenCalledWith(true);
  });

  it('disabled 状态包含 m-switch-disabled 类名', async () => {
    const { container } = render(MSwitch, {
      props: { modelValue: false, disabled: true },
    });

    const el = container.querySelector('.m-switch');
    expect(el).not.toBeNull();
    expect(el!.classList.contains('m-switch-disabled')).toBe(true);
  });
});
