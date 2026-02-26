/**
 * @description headless timeline / timeline-item 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MTimeline from '../MTimeline';
import MTimelineItem from '../MTimelineItem';

describe('MTimeline browser', () => {
  it('渲染 m-timeline 根元素', async () => {
    const { container } = render(MTimeline, {
      slots: {
        default: () => [
          h(MTimelineItem, { timestamp: '2026-01-01' }, { default: () => '事件一' }),
        ],
      },
    });

    expect(container.querySelector('.m-timeline')).not.toBeNull();
  });

  it('渲染正确数量的 m-timeline-item', async () => {
    const { container } = render(MTimeline, {
      slots: {
        default: () => [
          h(MTimelineItem, { timestamp: '2026-01-01' }, { default: () => '事件一' }),
          h(MTimelineItem, { timestamp: '2026-01-02' }, { default: () => '事件二' }),
          h(MTimelineItem, { timestamp: '2026-01-03' }, { default: () => '事件三' }),
        ],
      },
    });

    const items = container.querySelectorAll('.m-timeline-item');
    expect(items.length).toBe(3);
  });

  it('reverse=true 时子节点倒序渲染', async () => {
    const { container } = render(MTimeline, {
      props: { reverse: true },
      slots: {
        default: () => [
          h(MTimelineItem, { timestamp: '2026-01-01' }, { default: () => '第一事件' }),
          h(MTimelineItem, { timestamp: '2026-01-02' }, { default: () => '第二事件' }),
        ],
      },
    });

    // 倒序渲染时，原来第二个内容应先出现
    const items = container.querySelectorAll('.m-timeline-item');
    expect(items[0].textContent).toContain('第二事件');
    expect(items[1].textContent).toContain('第一事件');
  });
});

describe('MTimelineItem browser', () => {
  it('渲染 m-timeline-item 结构', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-01' },
      slots: { default: () => '事件内容' },
    });

    expect(container.querySelector('.m-timeline-item')).not.toBeNull();
    expect(container.querySelector('.m-timeline-track')).not.toBeNull();
    expect(container.querySelector('.m-timeline-content')).not.toBeNull();
  });

  it('渲染时间戳（默认 placement 为下方）', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-15' },
      slots: { default: () => '事件内容' },
    });

    const timestamp = container.querySelector('.m-timeline-timestamp');
    expect(timestamp).not.toBeNull();
    expect(timestamp!.textContent).toBe('2026-01-15');
  });

  it('hideTimestamp=true 时不渲染时间戳', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-15', hideTimestamp: true },
      slots: { default: () => '事件内容' },
    });

    expect(container.querySelector('.m-timeline-timestamp')).toBeNull();
  });

  it('默认节点有 m-timeline-node-primary 类', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-01' },
      slots: { default: () => '事件' },
    });

    const node = container.querySelector('.m-timeline-node');
    expect(node!.classList.contains('m-timeline-node-primary')).toBe(true);
  });

  it('type=success 时节点有 m-timeline-node-success 类', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-01', type: 'success' },
      slots: { default: () => '成功事件' },
    });

    const node = container.querySelector('.m-timeline-node');
    expect(node!.classList.contains('m-timeline-node-success')).toBe(true);
  });

  it('hollow=true 时节点有 m-timeline-node-hollow 类', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-01', hollow: true },
      slots: { default: () => '空心节点' },
    });

    const node = container.querySelector('.m-timeline-node');
    expect(node!.classList.contains('m-timeline-node-hollow')).toBe(true);
  });

  it('placement=top 时时间戳在内容上方', async () => {
    const { container } = render(MTimelineItem, {
      props: { timestamp: '2026-01-01', placement: 'top' },
      slots: { default: () => '事件内容' },
    });

    const item = container.querySelector('.m-timeline-item');
    const children = Array.from(item!.children);
    // 第一个子元素应该是时间戳
    expect(children[0].classList.contains('m-timeline-timestamp')).toBe(true);
  });
});
