/**
 * @description lib popover 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MPopover from '../MPopover';

describe('lib MPopover browser', () => {
  it('渲染 popover 容器结构', async () => {
    const { container } = render(MPopover, {
      props: {},
      slots: {
        default: '<button class="trigger-btn">触发按钮</button>',
        content: '<div class="pop-content">弹出内容</div>',
      },
    });

    expect(container.querySelector('.m-popover')).not.toBeNull();
    expect(container.querySelector('.m-popover-default-wrapper')).not.toBeNull();
  });

  it('show prop 控制初始显示（mountRender=true）', async () => {
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
    // 内容 slot 也应可见
    const inner = container.querySelector('.shown-content');
    expect(inner).not.toBeNull();
  });

  it('点击触发区域后弹出内容可见', async () => {
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

    const content = container.querySelector('.m-popover-content');
    expect(content).not.toBeNull();
  });

  it('hover=true 时点击不触发弹出', async () => {
    const { container } = render(MPopover, {
      props: { hover: true },
      slots: {
        default: '<button>悬停触发</button>',
        content: '<div class="hover-content">悬停内容</div>',
      },
    });

    const wrapper = container.querySelector('.m-popover-default-wrapper') as HTMLElement;
    wrapper.click();
    await nextTick();
    await nextTick();

    // hover 模式下点击不触发，内容不渲染
    const pop = container.querySelector('.hover-content');
    expect(pop).toBeNull();
  });

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

    // 内容通过 Teleport 挂到 body，不在 container 内
    const inBody = document.querySelector('.teleported-pop');
    expect(inBody).not.toBeNull();
    const inContainer = container.querySelector('.teleported-pop');
    expect(inContainer).toBeNull();
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
});
