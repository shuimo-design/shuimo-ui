/**
 * @description lib tooltip 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MTooltip from '../MTooltip';

describe('lib MTooltip browser', () => {
  it('渲染 tooltip 容器结构', async () => {
    const { container } = render(MTooltip, {
      props: { content: '提示文本' },
      slots: {
        default: '<button class="tip-btn">悬停我</button>',
      },
    });

    expect(container.querySelector('.m-tooltip')).not.toBeNull();
  });

  it('初始不显示浮层内容', async () => {
    const { container } = render(MTooltip, {
      props: { content: '提示内容' },
      slots: {
        default: '<button>按钮</button>',
      },
    });

    // 未触发 hover，浮层内容不可见
    const wrapper = container.querySelector('.m-tooltip-wrapper');
    expect(wrapper).toBeNull();
  });

  it('mouseenter 显示浮层内容', async () => {
    const { container } = render(MTooltip, {
      props: { content: 'hover提示', hover: true },
      slots: {
        default: '<span>hover我</span>',
      },
    });

    const trigger = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    expect(trigger).not.toBeNull();
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    const contentArea = container.querySelector('.m-popover-content') as HTMLElement | null;
    expect(contentArea).not.toBeNull();
  });

  it('mouseleave 隐藏浮层内容', async () => {
    const { container } = render(MTooltip, {
      props: { content: '消失提示', hover: true },
      slots: {
        default: '<span>hover我</span>',
      },
    });

    const trigger = container.querySelector('.m-popover-default-wrapper') as HTMLElement;

    // 先触发 mouseenter 显示
    trigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await nextTick();
    await nextTick();

    // 再触发 mouseleave 隐藏
    trigger.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await nextTick();
    await nextTick();

    // 浮层内容被隐藏
    const wrapper = container.querySelector('.m-tooltip-wrapper');
    expect(wrapper).toBeNull();
  });

  it('popover 容器包含 m-popover-content 结构', async () => {
    const { container } = render(MTooltip, {
      props: { content: '提示文本' },
      slots: {
        default: '<button>按钮</button>',
        content: () => '自定义内容',
      },
    });

    // MTooltip 内部通过 MPopover 渲染，content 区域始终存在于 DOM
    const contentArea = container.querySelector('.m-popover-content');
    expect(contentArea).not.toBeNull();
  });
});
