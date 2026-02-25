/**
 * @description headless tree 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 注意：MTreeNode 通过 resolveComponent('MTreeNode') 实现递归，
 * 因此必须在全局组件中注册，否则子节点递归渲染会失败。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import MTree from '../MTree';
import MTreeNode from '../MTreeNode';

const treeData = [
  {
    key: '1',
    label: '节点1',
    children: [
      { key: '1-1', label: '节点1-1' },
      { key: '1-2', label: '节点1-2' },
    ],
  },
  { key: '2', label: '节点2' },
];

describe('MTree browser', () => {
  // 统一的渲染辅助函数，全局注册 MTreeNode 以支持递归
  const renderTree = (props: Record<string, unknown> = {}) =>
    render(MTree, {
      props: { data: treeData, ...props },
      global: { components: { MTreeNode } },
    });

  it('渲染树节点并显示 label', async () => {
    const screen = renderTree();
    await expect.element(screen.getByText('节点1')).toBeInTheDocument();
    await expect.element(screen.getByText('节点2')).toBeInTheDocument();
  });

  it('根容器带有 m-tree class', async () => {
    const { container } = renderTree();
    const tree = container.querySelector('.m-tree');
    expect(tree).not.toBeNull();
  });

  it('有子节点的节点渲染展开箭头图标', async () => {
    const { container } = renderTree();
    // 节点1 有子节点，应渲染 .m-tree-icon
    const icon = container.querySelector('.m-tree-icon');
    expect(icon).not.toBeNull();
  });

  it('无子节点的节点渲染占位元素而非箭头', async () => {
    const { container } = renderTree();
    // 节点2 没有子节点，应渲染 .m-tree-icon-placeholder
    const placeholder = container.querySelector('.m-tree-icon-placeholder');
    expect(placeholder).not.toBeNull();
  });

  it('默认状态下子节点不可见（未展开）', async () => {
    const { container } = renderTree();
    // 初始未展开，.m-tree-node-child 不应存在
    expect(container.querySelector('.m-tree-node-child')).toBeNull();
  });

  it('点击展开箭头后子节点变为可见', async () => {
    const { container } = renderTree();
    const expandIcon = container.querySelector('.m-tree-icon') as HTMLElement;
    expect(expandIcon).not.toBeNull();
    expandIcon.click();
    // 等待 Vue 响应式更新
    await new Promise(r => setTimeout(r, 50));
    expect(container.querySelector('.m-tree-node-child')).not.toBeNull();
  });

  it('点击展开后子节点 label 可见', async () => {
    const screen = renderTree();
    const { container } = screen;
    const expandIcon = container.querySelector('.m-tree-icon') as HTMLElement;
    expandIcon.click();
    await new Promise(r => setTimeout(r, 50));
    await expect.element(screen.getByText('节点1-1')).toBeInTheDocument();
    await expect.element(screen.getByText('节点1-2')).toBeInTheDocument();
  });

  it('defaultExpandAll 时所有子节点默认可见', async () => {
    const screen = renderTree({ defaultExpandAll: true });
    await expect.element(screen.getByText('节点1-1')).toBeInTheDocument();
    await expect.element(screen.getByText('节点1-2')).toBeInTheDocument();
  });

  it('defaultExpandAll 时 .m-tree-node-child 存在', async () => {
    const { container } = renderTree({ defaultExpandAll: true });
    expect(container.querySelector('.m-tree-node-child')).not.toBeNull();
  });

  it('checkbox 模式渲染 input[type="checkbox"]', async () => {
    const { container } = renderTree({ checkbox: true });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('checkbox 模式下节点内容使用 label 包裹', async () => {
    const { container } = renderTree({ checkbox: true });
    const labelEl = container.querySelector('label.m-tree-node-content');
    expect(labelEl).not.toBeNull();
  });

  it('非 checkbox 模式节点内容使用 div 包裹', async () => {
    const { container } = renderTree();
    const divEl = container.querySelector('div.m-tree-node-content');
    expect(divEl).not.toBeNull();
  });

  it('node-click 事件在点击节点 label 时触发', async () => {
    const onNodeClick = vi.fn();
    const screen = renderTree({ 'onNode-click': onNodeClick });
    const label = screen.getByText('节点2');
    await label.click();
    expect(onNodeClick).toHaveBeenCalled();
  });

  it('node-click 事件携带正确的节点数据', async () => {
    const onNodeClick = vi.fn();
    const screen = renderTree({ 'onNode-click': onNodeClick });
    await screen.getByText('节点2').click();
    // 第一个参数应为节点数据对象，包含 key 和 label
    const nodeArg = onNodeClick.mock.calls[0][0];
    expect(nodeArg).toMatchObject({ key: '2', label: '节点2' });
  });

  it('每个根节点渲染独立的 .m-tree-node 容器', async () => {
    const { container } = renderTree();
    // treeData 有 2 个根节点
    const nodes = container.querySelectorAll('.m-tree > .m-tree-node');
    expect(nodes.length).toBe(2);
  });
});
