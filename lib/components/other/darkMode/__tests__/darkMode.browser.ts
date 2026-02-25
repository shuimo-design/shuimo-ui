/**
 * @description lib darkMode 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDarkMode from '../MDarkMode';

describe('MDarkMode browser', () => {
  it('渲染暗黑模式切换', async () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: false },
    });

    expect(container.querySelector('.m-dark-mode')).not.toBeNull();
  });

  it('渲染 SVG 图标', async () => {
    const { container } = render(MDarkMode, {
      props: { modelValue: false },
    });

    expect(container.querySelector('.m-dark-mode-svg')).not.toBeNull();
  });

  it('点击切换触发 update:modelValue', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MDarkMode, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': onUpdate,
      },
    });

    const darkMode = container.querySelector('.m-dark-mode') as HTMLElement;
    darkMode.click();

    expect(onUpdate).toHaveBeenCalledWith(true);
  });
});
