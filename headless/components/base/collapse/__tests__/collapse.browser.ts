/**
 * @description headless collapse / collapse-item 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h, nextTick } from 'vue';
import MCollapse from '../MCollapse';
import MCollapseItem from '../MCollapseItem';

describe('MCollapse browser', () => {
  it('渲染 m-collapse 根元素', async () => {
    const { container } = render(MCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '面板A' }, { default: () => '内容A' }),
        ],
      },
    });

    expect(container.querySelector('.m-collapse')).not.toBeNull();
  });

  it('渲染 collapse-item 的头部标题', async () => {
    const { container } = render(MCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '面板A标题' }, { default: () => '内容A' }),
        ],
      },
    });

    const header = container.querySelector('.m-collapse-header');
    expect(header).not.toBeNull();
    expect(header!.textContent).toBe('面板A标题');
  });

  it('默认未展开时内容区域无 m-collapse-content-active 类', async () => {
    const { container } = render(MCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '面板A' }, { default: () => '内容A' }),
        ],
      },
    });

    const content = container.querySelector('.m-collapse-content');
    expect(content!.classList.contains('m-collapse-content-active')).toBe(false);
  });

  it('modelValue 包含 name 时对应 item 为展开态', async () => {
    const { container } = render(MCollapse, {
      props: { modelValue: ['a'] },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '面板A' }, { default: () => '内容A' }),
          h(MCollapseItem, { name: 'b', title: '面板B' }, { default: () => '内容B' }),
        ],
      },
    });

    const items = container.querySelectorAll('.m-collapse-item');
    expect(items[0].classList.contains('m-collapse-item-active')).toBe(true);
    expect(items[1].classList.contains('m-collapse-item-active')).toBe(false);
  });

  it('点击 header 触发 update:modelValue 事件', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MCollapse, {
      props: { modelValue: [], 'onUpdate:modelValue': onUpdate },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '面板A' }, { default: () => '内容A' }),
        ],
      },
    });

    const header = container.querySelector('.m-collapse-header') as HTMLElement;
    header.click();
    await nextTick();

    expect(onUpdate).toHaveBeenCalled();
  });

  it('disabled 的 item 点击不触发展开', async () => {
    const onUpdate = vi.fn();
    const { container } = render(MCollapse, {
      props: { modelValue: [], 'onUpdate:modelValue': onUpdate },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '禁用面板', disabled: true }, { default: () => '内容A' }),
        ],
      },
    });

    const header = container.querySelector('.m-collapse-header') as HTMLElement;
    header.click();
    await nextTick();

    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('title slot 优先于 title prop', async () => {
    const { container } = render(MCollapse, {
      props: { modelValue: [] },
      slots: {
        default: () => [
          h(MCollapseItem, { name: 'a', title: '被覆盖标题' }, {
            title: () => '自定义标题',
            default: () => '内容',
          }),
        ],
      },
    });

    const header = container.querySelector('.m-collapse-header');
    expect(header!.textContent).toBe('自定义标题');
  });
});
