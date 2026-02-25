/**
 * @description lib menu 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MMenu from '../MMenu';

const menuData = [
  {
    key: '1',
    label: '首页',
  },
  {
    key: '2',
    label: '系统管理',
    children: [
      { key: '2-1', label: '用户管理' },
      { key: '2-2', label: '角色管理' },
    ],
  },
];

describe('MMenu browser', () => {
  it('渲染菜单', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
    });

    expect(container.querySelector('.m-menu')).not.toBeNull();
  });

  it('渲染菜单主体', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
    });

    const menuMain = container.querySelector('.m-menu-main');
    expect(menuMain).not.toBeNull();
  });

  it('渲染菜单节点内容', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
    });

    const menu = container.querySelector('.m-menu');
    expect(menu!.textContent).toContain('首页');
    expect(menu!.textContent).toContain('系统管理');
  });
});
