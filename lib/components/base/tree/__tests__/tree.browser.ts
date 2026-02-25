/**
 * @description lib tree 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MTree from '../MTree';

const treeData = [
  {
    key: '1',
    label: '一级节点A',
    children: [
      { key: '1-1', label: '二级节点A-1' },
      { key: '1-2', label: '二级节点A-2' },
    ],
  },
  {
    key: '2',
    label: '一级节点B',
  },
];

describe('MTree browser', () => {
  it('渲染树组件', async () => {
    const { container } = render(MTree, {
      props: { data: treeData },
    });

    expect(container.querySelector('.m-tree')).not.toBeNull();
  });

  it('渲染树节点', async () => {
    const { container } = render(MTree, {
      props: { data: treeData },
    });

    const tree = container.querySelector('.m-tree');
    expect(tree).not.toBeNull();
    // 节点内容应该包含一级节点文本
    expect(tree!.textContent).toContain('一级节点A');
    expect(tree!.textContent).toContain('一级节点B');
  });
});
