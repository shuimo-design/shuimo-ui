/**
 * @description lib progress 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MProgress from '../MProgress';

describe('MProgress browser (lib)', () => {
  it('渲染进度条，包含 m-progress 类名', async () => {
    const { container } = render(MProgress, {});

    const el = container.querySelector('.m-progress');
    expect(el).not.toBeNull();
  });

  it('value prop 正确渲染百分比信息', async () => {
    const { container } = render(MProgress, {
      props: { value: 50, max: 100 },
    });

    const el = container.querySelector('.m-progress');
    expect(el).not.toBeNull();
    // showInfo 默认为 true，应显示百分比文本
    const perEl = container.querySelector('.m-progress-per');
    expect(perEl).not.toBeNull();
    expect(perEl!.textContent).toContain('50%');
  });
});
