/**
 * @description headless Tooltip 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MTooltip from '../MTooltip';

describe('MTooltip browser', () => {
  // --- 基础渲染 ---
  it('渲染 tooltip 触发容器结构', async () => {
    const { container } = render(MTooltip, {
      props: { content: '提示文本' },
      slots: {
        default: '<button class="tip-btn">悬停我</button>',
      },
    });

    expect(container.querySelector('.m-tooltip')).not.toBeNull();
  });

  it('default slot 内容渲染在触发容器内', async () => {
    const { container } = render(MTooltip, {
      props: { content: '这是一个提示' },
      slots: {
        default: '<span class="tip-target">目标元素</span>',
      },
    });

    const tooltip = container.querySelector('.m-tooltip');
    expect(tooltip!.querySelector('.tip-target')).not.toBeNull();
  });

  // --- 初始状态 ---
  it('初始状态下 tooltip 内容不显示', async () => {
    render(MTooltip, {
      props: { content: '提示内容' },
      slots: {
        default: '<button>按钮</button>',
      },
    });

    // 初始不 visible，teleported 内容不渲染
    const content = document.querySelector('.m-tooltip-content');
    expect(content).toBeNull();
  });

  // --- mouseenter 触发 ---
  it('mouseenter 后 tooltip 内容挂载到 document.body', async () => {
    const { container } = render(MTooltip, {
      props: { content: 'hover提示' },
      slots: {
        default: '<span>hover我</span>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    // 内容通过 Teleport 挂到 body
    const content = document.querySelector('.m-tooltip-content');
    expect(content).not.toBeNull();
  });

  it('mouseleave 后 tooltip 内容从 body 移除', async () => {
    const { container } = render(MTooltip, {
      props: { content: '消失提示' },
      slots: {
        default: '<span>hover我</span>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;

    // 先显示
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    // 再隐藏
    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await nextTick();
    await nextTick();

    const content = document.querySelector('.m-tooltip-content');
    expect(content).toBeNull();
  });

  // --- content prop ---
  it('通过 content prop 渲染文本内容', async () => {
    const { container } = render(MTooltip, {
      props: { content: '来自prop的提示' },
      slots: {
        default: '<button>按钮</button>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    const content = document.querySelector('.m-tooltip-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toContain('来自prop的提示');
  });

  // --- content slot 优先级 ---
  it('content slot 优先于 content prop 渲染', async () => {
    const { container } = render(MTooltip, {
      props: { content: '不应该显示的prop' },
      slots: {
        default: '<button>按钮</button>',
        content: '<strong class="slot-content">slot里的内容</strong>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    // slot 内容存在
    const slotEl = document.querySelector('.slot-content');
    expect(slotEl).not.toBeNull();
    expect(slotEl!.textContent).toBe('slot里的内容');
  });

  // --- placement ---
  it('placement prop 设置到 data-placement 属性', async () => {
    const { container } = render(MTooltip, {
      props: { content: '底部提示', placement: 'bottom' },
      slots: {
        default: '<button>按钮</button>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    const content = document.querySelector('.m-tooltip-content');
    expect(content).not.toBeNull();
    expect(content!.getAttribute('data-placement')).toBe('bottom');
  });

  // --- disabled ---
  it('disabled=true 时 mouseenter 不显示内容', async () => {
    const { container } = render(MTooltip, {
      props: { content: '禁用的提示', disabled: true },
      slots: {
        default: '<button>禁用按钮</button>',
      },
    });

    const trigger = container.querySelector('.m-tooltip') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    const content = document.querySelector('.m-tooltip-content');
    expect(content).toBeNull();
  });
});
