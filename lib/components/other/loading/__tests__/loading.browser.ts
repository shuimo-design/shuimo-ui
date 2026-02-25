/**
 * @description lib loading 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MLoading from '../MLoading';

describe('MLoading browser (lib)', () => {
  it('渲染加载组件，包含 m-loading 类名', async () => {
    const { container } = render(MLoading, {});

    const el = container.querySelector('.m-loading');
    expect(el).not.toBeNull();
  });
});
