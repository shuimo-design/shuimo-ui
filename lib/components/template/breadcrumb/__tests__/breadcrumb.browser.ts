/**
 * @description lib breadcrumb 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MBreadcrumb from '../MBreadcrumb';

describe('MBreadcrumb browser (lib)', () => {
  it('渲染面包屑，包含 m-breadcrumb 类名', async () => {
    const { container } = render(MBreadcrumb, {
      props: {
        options: [
          { content: '首页' },
          { content: '列表' },
        ],
      },
    });

    const el = container.querySelector('.m-breadcrumb');
    expect(el).not.toBeNull();
    // BreadcrumbItem 使用 content prop 渲染文本
    expect(el!.textContent).toContain('首页');
    expect(el!.textContent).toContain('列表');
  });
});
