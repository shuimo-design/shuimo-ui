/**
 * @description headless Menu 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MMenu from '../MMenu';
import MMenuItem from '../MMenuItem';

/** 基础菜单数据 */
const menuData = [
  {
    key: '1',
    label: '菜单1',
    children: [
      { key: '1-1', label: '子菜单1-1' },
      { key: '1-2', label: '子菜单1-2' },
    ],
  },
  {
    key: '2',
    label: '菜单2',
  },
  {
    key: '3',
    label: '菜单3（禁用）',
    disabled: true,
  },
];

/** 全局注册 MMenuItem，避免 resolveComponent 找不到组件 */
const globalConfig = {
  global: {
    components: { MMenuItem },
  },
};

describe('MMenu browser', () => {
  // --- 基础渲染 ---
  it('渲染菜单容器并显示根级菜单项', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    expect(container.querySelector('.m-menu')).not.toBeNull();
    expect(container.querySelector('.m-menu-main')).not.toBeNull();

    // 根级菜单项
    const rootItems = container.querySelectorAll('.m-menu-item.m-menu-item-root');
    expect(rootItems.length).toBe(3);
  });

  it('渲染菜单项的 label 文本', async () => {
    const screen = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    await expect.element(screen.getByText('菜单1')).toBeInTheDocument();
    await expect.element(screen.getByText('菜单2')).toBeInTheDocument();
    await expect.element(screen.getByText('菜单3（禁用）')).toBeInTheDocument();
  });

  it('有子节点的菜单项显示展开箭头', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    // 菜单1 有子节点，应有箭头；菜单2 无子节点，无箭头
    const arrows = container.querySelectorAll('.m-menu-item-arrow');
    expect(arrows.length).toBe(1);
  });

  // --- 展开子菜单 ---
  it('点击有子菜单的项展开子节点', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    // 初始无子菜单区域
    expect(container.querySelector('.m-menu-item-children')).toBeNull();

    // 点击菜单1 的 label
    const labels = container.querySelectorAll('.m-menu-item-label');
    (labels[0] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    // 展开后出现子菜单容器
    const children = container.querySelector('.m-menu-item-children');
    expect(children).not.toBeNull();

    // 子节点可见
    const childItems = children!.querySelectorAll('.m-menu-item');
    expect(childItems.length).toBe(2);
  });

  it('再次点击同一节点收起子菜单', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    const labels = container.querySelectorAll('.m-menu-item-label');

    // 展开
    (labels[0] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));
    expect(container.querySelector('.m-menu-item-children')).not.toBeNull();

    // 再次点击收起
    (labels[0] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));
    expect(container.querySelector('.m-menu-item-children')).toBeNull();
  });

  // --- 事件 ---
  it('点击菜单项触发 node-click 事件', async () => {
    const onNodeClick = vi.fn();
    const { container } = render(MMenu, {
      props: {
        data: menuData,
        'onNode-click': onNodeClick,
      },
      ...globalConfig,
    });

    // 点击菜单2（无子节点）
    const rootItems = container.querySelectorAll('.m-menu-item.m-menu-item-root');
    (rootItems[1] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onNodeClick).toHaveBeenCalledTimes(1);
    const [node] = onNodeClick.mock.calls[0] as [{ key: string; label: string }, MouseEvent];
    expect(node.key).toBe('2');
    expect(node.label).toBe('菜单2');
  });

  it('点击子菜单项触发 node-click 并携带正确节点', async () => {
    const onNodeClick = vi.fn();
    const { container } = render(MMenu, {
      props: {
        data: menuData,
        'onNode-click': onNodeClick,
      },
      ...globalConfig,
    });

    // 先展开菜单1
    const labels = container.querySelectorAll('.m-menu-item-label');
    (labels[0] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    // 点击子菜单1-1
    const childItems = container.querySelectorAll('.m-menu-item-children .m-menu-item');
    (childItems[0] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    // 点击 label 只触发展开（expandEvent + stopPropagation），不触发 node-click
    // 点击子菜单项触发 node-click 1 次
    expect(onNodeClick).toHaveBeenCalledTimes(1);
    const lastCall = onNodeClick.mock.calls[0] as [{ key: string }, MouseEvent];
    expect(lastCall[0].key).toBe('1-1');
  });

  // --- 禁用状态 ---
  it('禁用节点带 m-menu-item-disabled 类', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    const disabledItems = container.querySelectorAll('.m-menu-item-disabled');
    expect(disabledItems.length).toBe(1);
    expect(disabledItems[0].querySelector('.m-menu-item-label')!.textContent).toContain('菜单3（禁用）');
  });

  it('点击禁用节点不触发 node-click', async () => {
    const onNodeClick = vi.fn();
    const { container } = render(MMenu, {
      props: {
        data: menuData,
        'onNode-click': onNodeClick,
      },
      ...globalConfig,
    });

    const disabledItem = container.querySelector('.m-menu-item-disabled') as HTMLElement;
    disabledItem.click();
    await nextTick();

    expect(onNodeClick).not.toHaveBeenCalled();
  });

  // --- 激活状态 ---
  it('点击菜单项后该项带 m-menu-item-active 类', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData },
      ...globalConfig,
    });

    const rootItems = container.querySelectorAll('.m-menu-item.m-menu-item-root');
    (rootItems[1] as HTMLElement).click();
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(rootItems[1].classList.contains('m-menu-item-active')).toBe(true);
  });

  // --- checkbox 模式 ---
  it('checkbox=true 时每个菜单项渲染 checkbox', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData, checkbox: true },
      ...globalConfig,
    });

    const checkboxes = container.querySelectorAll('.m-menu-item-checkbox');
    // 3 个根级节点各有一个 checkbox
    expect(checkboxes.length).toBe(3);

    // checkbox 输入框类型正确
    checkboxes.forEach(cb => {
      expect((cb as HTMLInputElement).type).toBe('checkbox');
    });
  });

  it('checkbox 模式下禁用节点的 checkbox 也是禁用状态', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData, checkbox: true },
      ...globalConfig,
    });

    const disabledItem = container.querySelector('.m-menu-item-disabled') as HTMLElement;
    const cb = disabledItem.querySelector('.m-menu-item-checkbox') as HTMLInputElement;
    expect(cb.disabled).toBe(true);
  });

  it('checkbox 勾选后触发 update:checkedKeys 事件', async () => {
    const onCheckedKeys = vi.fn();
    const { container } = render(MMenu, {
      props: {
        data: menuData,
        checkbox: true,
        'onUpdate:checkedKeys': onCheckedKeys,
      },
      ...globalConfig,
    });

    // 勾选菜单2 的 checkbox
    const checkboxes = container.querySelectorAll('.m-menu-item-checkbox');
    const cb = checkboxes[1] as HTMLInputElement;
    cb.checked = true;
    cb.dispatchEvent(new Event('change', { bubbles: true }));
    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    expect(onCheckedKeys).toHaveBeenCalledTimes(1);
    const [keys] = onCheckedKeys.mock.calls[0] as [(string | number)[][]];
    expect(Array.isArray(keys)).toBe(true);
  });

  // --- defaultExpandAll ---
  it('defaultExpandAll=true 时所有有子节点的菜单项默认展开', async () => {
    const { container } = render(MMenu, {
      props: { data: menuData, defaultExpandAll: true },
      ...globalConfig,
    });

    await nextTick();

    // 菜单1 的子节点应直接可见
    const childrenContainer = container.querySelector('.m-menu-item-children');
    expect(childrenContainer).not.toBeNull();

    const childLabels = childrenContainer!.querySelectorAll('.m-menu-item-label');
    expect(childLabels.length).toBe(2);
  });

  // --- 自定义字段映射 ---
  it('自定义 config 字段映射正确渲染', async () => {
    const customData = [
      { id: 'a', name: '自定义菜单A', key: 'a' },
      { id: 'b', name: '自定义菜单B', key: 'b' },
    ];

    const screen = render(MMenu, {
      props: {
        data: customData,
        config: { key: 'id', label: 'name', children: 'sub' },
      },
      ...globalConfig,
    });

    const labels = screen.container.querySelectorAll('.m-menu-item-label');
    const labelTexts = Array.from(labels).map(el => el.textContent);
    expect(labelTexts).toContain('自定义菜单A');
    expect(labelTexts).toContain('自定义菜单B');
  });
});
