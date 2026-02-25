/**
 * @description lib svg 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MSvgIcon from '../MSvgIcon';

describe('MSvgIcon browser (lib)', () => {
  it('渲染 SVG 图标，包含 m-svg-icon 类名', async () => {
    const { container } = render(MSvgIcon, {});

    const el = container.querySelector('.m-svg-icon');
    expect(el).not.toBeNull();
  });
});
