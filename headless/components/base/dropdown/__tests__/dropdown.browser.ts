/**
 * @description headless dropdown / dropdown-item 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h, nextTick } from 'vue';
import MDropdown from '../MDropdown';
import MDropdownItem from '../MDropdownItem';

describe('MDropdown browser', () => {
  it('渲染 m-dropdown 根元素和触发器', async () => {
    const { container } = render(MDropdown, {
      slots: {
        default: () => '触发按钮',
        menu: () => [],
      },
    });

    expect(container.querySelector('.m-dropdown')).not.toBeNull();
    expect(container.querySelector('.m-dropdown-trigger')).not.toBeNull();
  });

  it('默认不显示菜单', async () => {
    render(MDropdown, {
      slots: {
        default: () => '触发按钮',
        menu: () => [],
      },
    });

    await nextTick();
    expect(document.querySelector('.m-dropdown-menu')).toBeNull();
  });

  it('click 触发器打开菜单（trigger=click）', async () => {
    const { container } = render(MDropdown, {
      props: { trigger: 'click' },
      slots: {
        default: () => '触发按钮',
        menu: () => [
          h(MDropdownItem, { command: 'a', label: '选项A' }),
        ],
      },
    });

    const trigger = container.querySelector('.m-dropdown-trigger') as HTMLElement;
    trigger.click();
    await nextTick();
    await nextTick();

    const menu = document.querySelector('.m-dropdown-menu');
    expect(menu).not.toBeNull();
  });

  it('菜单中正确渲染 MDropdownItem', async () => {
    const { container } = render(MDropdown, {
      props: { trigger: 'click' },
      slots: {
        default: () => '触发按钮',
        menu: () => [
          h(MDropdownItem, { command: 'a', label: '选项A' }),
          h(MDropdownItem, { command: 'b', label: '选项B' }),
        ],
      },
    });

    (container.querySelector('.m-dropdown-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const items = document.querySelectorAll('.m-dropdown-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('选项A');
  });

  it('点击菜单项触发 command 事件', async () => {
    const onCommand = vi.fn();
    const { container } = render(MDropdown, {
      props: { trigger: 'click', onCommand },
      slots: {
        default: () => '触发按钮',
        menu: () => [
          h(MDropdownItem, { command: 'edit', label: '编辑' }),
          h(MDropdownItem, { command: 'delete', label: '删除' }),
        ],
      },
    });

    (container.querySelector('.m-dropdown-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const items = document.querySelectorAll('.m-dropdown-item');
    (items[0] as HTMLElement).click();
    await nextTick();

    expect(onCommand).toHaveBeenCalledWith('edit');
  });

  it('disabled 的菜单项有 m-dropdown-item-disabled 类', async () => {
    const { container } = render(MDropdown, {
      props: { trigger: 'click' },
      slots: {
        default: () => '触发按钮',
        menu: () => [
          h(MDropdownItem, { command: 'a', label: '禁用项', disabled: true }),
        ],
      },
    });

    (container.querySelector('.m-dropdown-trigger') as HTMLElement).click();
    await nextTick();
    await nextTick();

    const item = document.querySelector('.m-dropdown-item');
    expect(item!.classList.contains('m-dropdown-item-disabled')).toBe(true);
  });
});

describe('MDropdownItem browser', () => {
  it('渲染 m-dropdown-item 并显示 label', async () => {
    const { container } = render(MDropdownItem, {
      props: { label: '菜单项文字', command: 'test' },
    });

    const item = container.querySelector('.m-dropdown-item');
    expect(item).not.toBeNull();
    expect(item!.textContent).toBe('菜单项文字');
  });

  it('default slot 内容覆盖 label', async () => {
    const { container } = render(MDropdownItem, {
      props: { command: 'test', label: '被覆盖' },
      slots: { default: () => '插槽内容' },
    });

    const item = container.querySelector('.m-dropdown-item');
    expect(item!.textContent).toBe('插槽内容');
  });

  it('divided=true 时有 m-dropdown-item-divided 类', async () => {
    const { container } = render(MDropdownItem, {
      props: { command: 'test', label: '分隔项', divided: true },
    });

    expect(container.querySelector('.m-dropdown-item-divided')).not.toBeNull();
  });
});
