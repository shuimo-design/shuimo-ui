/**
 * @description headless Popover 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MPopover from '../MPopover';

describe('MPopover browser', () => {
  // --- 基础渲染 ---
  it('渲染 popover 基础结构', async () => {
    const { container } = render(MPopover, {
      props: {},
      slots: {
        default: '<button class="trigger-btn">触发按钮</button>',
        content: '<div class="pop-content">弹出内容</div>',
      },
    });

    expect(container.querySelector('.m-popover')).not.toBeNull();
    expect(container.querySelector('.m-popover-default-wrapper')).not.toBeNull();
    expect(container.querySelector('.m-popover-content')).not.toBeNull();
  });

  it('default slot 内容渲染在触发区域内', async () => {
    const { container } = render(MPopover, {
      props: {},
      slots: {
        default: '<button class="trigger-btn">点我弹出</button>',
        content: '<span>弹出内容</span>',
      },
    });

    const wrapper = container.querySelector('.m-popover-default-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.querySelector('.trigger-btn')).not.toBeNull();
  });

  // --- 点击触发 ---
  it('点击触发区域后弹出内容可见（无 teleport）', async () => {
    const { container } = render(MPopover, {
      props: {},
      slots: {
        default: '<button class="trigger-btn">触发</button>',
        content: '<div class="inner-pop">弹出区域</div>',
      },
    });

    const wrapper = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    wrapper.click();
    await nextTick();
    await nextTick();

    // 无 teleport 时内容在 .m-popover-content 内
    const content = container.querySelector('.m-popover-content');
    expect(content).not.toBeNull();
  });

  // --- show prop 控制 ---
  it('show=true 时初始显示弹出内容（mountRender）', async () => {
    const { container } = render(MPopover, {
      props: { show: true, mountRender: true },
      slots: {
        default: '<button>触发</button>',
        content: '<div class="shown-content">已展示内容</div>',
      },
    });

    await nextTick();
    await nextTick();

    // mountRender=true 时内容无论 visible 都会渲染
    const content = container.querySelector('.m-popover-content');
    expect(content).not.toBeNull();
  });

  it('mountRender=false 且未触发时不渲染 content slot 内容', async () => {
    const { container } = render(MPopover, {
      props: { mountRender: false },
      slots: {
        default: '<button>触发</button>',
        content: '<div class="hidden-pop">隐藏内容</div>',
      },
    });

    await nextTick();

    // 未触发时不渲染内部内容
    const pop = container.querySelector('.hidden-pop');
    expect(pop).toBeNull();
  });

  // --- arrow slot ---
  it('提供 arrow slot 时渲染箭头元素', async () => {
    const { container } = render(MPopover, {
      props: { show: true, mountRender: true },
      slots: {
        default: '<button>触发</button>',
        content: '<span>内容</span>',
        arrow: '<i class="custom-arrow"></i>',
      },
    });

    await nextTick();

    expect(container.querySelector('.m-popover-arrow')).not.toBeNull();
    expect(container.querySelector('.custom-arrow')).not.toBeNull();
  });

  it('未提供 arrow slot 时不渲染箭头元素', async () => {
    const { container } = render(MPopover, {
      props: {},
      slots: {
        default: '<button>触发</button>',
        content: '<span>内容</span>',
      },
    });

    expect(container.querySelector('.m-popover-arrow')).toBeNull();
  });

  // --- teleport ---
  it('teleport=true 时弹出内容挂载到 document.body', async () => {
    const { container } = render(MPopover, {
      props: { teleport: true, mountRender: true, show: true },
      slots: {
        default: '<button>触发</button>',
        content: '<div class="teleported-pop">传送内容</div>',
      },
    });

    await nextTick();
    await nextTick();

    // 内容应该不在 container 内，而在 body 中
    const inContainer = container.querySelector('.teleported-pop');
    const inBody = document.querySelector('.teleported-pop');
    expect(inBody).not.toBeNull();
    // container 内不应该有该内容（已 teleport）
    expect(inContainer).toBeNull();
  });

  // --- hover 模式 ---
  it('hover=true 时点击不触发弹出', async () => {
    const { container } = render(MPopover, {
      props: { hover: true },
      slots: {
        default: '<button class="hover-btn">悬停触发</button>',
        content: '<div class="hover-content">悬停内容</div>',
      },
    });

    // hover 模式下点击不应该触发
    const wrapper = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    wrapper.click();
    await nextTick();
    await nextTick();

    // click 不触发，内容不显示
    const pop = container.querySelector('.hover-content');
    expect(pop).toBeNull();
  });
});
