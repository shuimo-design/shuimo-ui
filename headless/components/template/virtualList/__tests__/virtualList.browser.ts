/**
 * @description 虚拟列表 browser e2e 测试
 * @author 阿怪
 * @date 2026/2/25 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 在真实浏览器中测试 IntersectionObserver 驱动的虚拟滚动
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { defineComponent, h } from 'vue';
import MVirtualList from '../MVirtualList';

/** 生成测试数据 */
const generateList = (count: number) => Array.from({ length: count }, (_, i) => `item-${i}`);

/** 包装组件：给容器一个固定高度，让 IntersectionObserver 工作 */
const createWrapper = (list: string[], height = 200) => {
  return defineComponent({
    setup(_, { emit }) {
      return () => h('div', { style: { height: `${height}px`, overflow: 'hidden' } }, [
        h(MVirtualList as any, {
          list,
          estimatedHeight: 40,
          style: { height: '100%' },
          onReachBottom: () => emit('reachBottom'),
        }, {
          default: ({ data, index }: { data: string; index: number }) =>
            h('div', {
              class: 'test-item',
              style: { height: '40px', lineHeight: '40px', boxSizing: 'border-box' },
              'data-index': index,
            }, data),
        }),
      ]);
    },
    emits: ['reachBottom'],
  });
};


describe('MVirtualList browser', () => {

  it('渲染虚拟列表并只显示部分数据', async () => {
    const list = generateList(1000);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    // 等待 IntersectionObserver 触发 + ResizeObserver 初始化
    await new Promise(r => setTimeout(r, 300));

    const items = document.querySelectorAll('.test-item');
    expect(items.length).toBeGreaterThan(0);
    expect(items.length).toBeLessThan(1000);
  });

  it('容器有正确的 CSS 类和 overflow', async () => {
    const list = generateList(100);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 100));

    const container = document.querySelector('.m-virtual-list');
    expect(container).not.toBeNull();
    const style = window.getComputedStyle(container!);
    expect(style.overflow).toBe('auto');
  });

  it('wrapper 有 translateY 样式', async () => {
    const list = generateList(100);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 100));

    const wrapper = document.querySelector('.m-virtual-list-wrapper');
    expect(wrapper).not.toBeNull();
    // 初始状态 translateY 应为 0
    expect(wrapper!.getAttribute('style')).toContain('translateY');
  });

  it('小数据量时渲染全部项', async () => {
    const list = generateList(3);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 100));

    const items = document.querySelectorAll('.test-item');
    expect(items.length).toBe(3);

    // 验证内容正确
    expect(items[0].textContent).toBe('item-0');
    expect(items[1].textContent).toBe('item-1');
    expect(items[2].textContent).toBe('item-2');
  });

  it('空列表不崩溃', async () => {
    const Wrapper = createWrapper([]);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 100));

    const container = document.querySelector('.m-virtual-list');
    expect(container).not.toBeNull();
    const items = document.querySelectorAll('.test-item');
    expect(items.length).toBe(0);
  });

  it('data-index 属性反映真实索引', async () => {
    const list = generateList(100);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 100));

    const items = document.querySelectorAll('.test-item');
    // 第一个渲染项的 index 应该是 0（初始状态）
    if (items.length > 0) {
      expect(items[0].getAttribute('data-index')).toBe('0');
    }
  });

  it('滚动后渲染范围更新', async () => {
    const list = generateList(1000);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 300));

    const container = document.querySelector('.m-virtual-list') as HTMLElement;
    // 记录初始渲染的第一个 data-index
    const itemsBefore = document.querySelectorAll('.test-item');
    const firstIndexBefore = Number(itemsBefore[0]?.getAttribute('data-index') ?? 0);

    // 滚动到中间位置
    container.scrollTop = 2000;
    // 手动触发 scrollend
    container.dispatchEvent(new Event('scrollend'));

    await new Promise(r => setTimeout(r, 300));

    const itemsAfter = document.querySelectorAll('.test-item');
    const firstIndexAfter = Number(itemsAfter[0]?.getAttribute('data-index') ?? 0);

    // 滚动后，第一个可见项的索引应该比初始时大
    expect(firstIndexAfter).toBeGreaterThan(firstIndexBefore);
  });

  it('spacer 高度反映总列表高度', async () => {
    const list = generateList(100);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 300));

    const spacer = document.querySelector('.m-virtual-list-spacer') as HTMLElement;
    expect(spacer).not.toBeNull();
    // 100 项 × 40px 预估高度 = 4000px（实际可能因测量有差异）
    const spacerHeight = parseInt(spacer.style.height);
    expect(spacerHeight).toBeGreaterThanOrEqual(3000);
  });

  it('快速滚动到底部后仍能正确渲染', async () => {
    const list = generateList(1000);
    const Wrapper = createWrapper(list);
    render(Wrapper);

    await new Promise(r => setTimeout(r, 300));

    const container = document.querySelector('.m-virtual-list') as HTMLElement;

    // 直接跳到底部
    container.scrollTop = container.scrollHeight;
    container.dispatchEvent(new Event('scrollend'));

    await new Promise(r => setTimeout(r, 300));

    const items = document.querySelectorAll('.test-item');
    expect(items.length).toBeGreaterThan(0);

    // 最后一个渲染项应接近 999
    const lastItem = items[items.length - 1];
    const lastIndex = Number(lastItem.getAttribute('data-index'));
    expect(lastIndex).toBe(999);
  });

  it('scrollTop 补偿：极端不等高时视觉不跳动', async () => {
    // 构造极端场景：前50项每项 20px，后50项每项 200px，estimatedHeight=60
    // 滚动到后半段时，前面实际总高度(50×20=1000) vs 预估(50×60=3000)，差 2000px
    const list = Array.from({ length: 100 }, (_, i) => ({
      text: `item-${i}`,
      height: i < 50 ? 20 : 200,
    }));

    const Wrapper = defineComponent({
      setup() {
        return () => h('div', { style: { height: '300px', overflow: 'hidden' } }, [
          h(MVirtualList as any, {
            list,
            estimatedHeight: 60,
            style: { height: '100%' },
          }, {
            default: ({ data, index }: { data: typeof list[0]; index: number }) =>
              h('div', {
                class: 'test-item',
                style: { height: `${data.height}px`, boxSizing: 'border-box' },
                'data-index': index,
              }, data.text),
          }),
        ]);
      },
    });

    render(Wrapper);
    await new Promise(r => setTimeout(r, 300));

    const container = document.querySelector('.m-virtual-list') as HTMLElement;

    // 先慢慢滚过前面的项，让高度缓存填充
    container.scrollTop = 500;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 200));

    container.scrollTop = 1000;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 200));

    // 现在跳到后半段（高项区域）
    container.scrollTop = 3000;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 200));

    // 记录补偿后的 scrollTop 和第一个可见项
    const scrollTopAfter = container.scrollTop;
    const items = document.querySelectorAll('.test-item');
    const firstIndex = Number(items[0]?.getAttribute('data-index') ?? -1);

    // 关键断言：渲染的项必须有效
    expect(items.length).toBeGreaterThan(0);
    expect(firstIndex).toBeGreaterThanOrEqual(0);

    // scrollTop 应该被补偿过（不再是精确的 3000）
    // 因为前 50 项实际 20px 而非预估 60px，总高度少了 2000px
    // 补偿后 scrollTop 会向下调整以保持视觉位置
    expect(scrollTopAfter).not.toBe(3000);
  });

  it('不等高元素：随机高度 30-150px', async () => {
    const list = Array.from({ length: 500 }, (_, i) => ({
      text: `item-${i}`,
      height: 30 + Math.floor(Math.random() * 120),
    }));

    const Wrapper = defineComponent({
      setup() {
        return () => h('div', { style: { height: '300px', overflow: 'hidden' } }, [
          h(MVirtualList as any, {
            list,
            estimatedHeight: 60,
            style: { height: '100%' },
          }, {
            default: ({ data, index }: { data: typeof list[0]; index: number }) =>
              h('div', {
                class: 'test-item',
                style: { height: `${data.height}px`, boxSizing: 'border-box' },
                'data-index': index,
                'data-height': data.height,
              }, data.text),
          }),
        ]);
      },
    });

    render(Wrapper);
    await new Promise(r => setTimeout(r, 300));

    // 初始渲染：虚拟化生效
    const itemsBefore = document.querySelectorAll('.test-item');
    expect(itemsBefore.length).toBeGreaterThan(0);
    expect(itemsBefore.length).toBeLessThan(500);

    const container = document.querySelector('.m-virtual-list') as HTMLElement;

    // 滚动到中间
    container.scrollTop = 5000;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 300));

    const itemsMid = document.querySelectorAll('.test-item');
    const firstMidIndex = Number(itemsMid[0]?.getAttribute('data-index') ?? 0);
    expect(firstMidIndex).toBeGreaterThan(0);
    // 验证高度确实不一致
    const heights = Array.from(itemsMid).map(el => el.getBoundingClientRect().height);
    const uniqueHeights = new Set(heights);
    expect(uniqueHeights.size).toBeGreaterThan(1);

    // 滚动到底部
    container.scrollTop = container.scrollHeight;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 300));

    const itemsEnd = document.querySelectorAll('.test-item');
    const lastIndex = Number(itemsEnd[itemsEnd.length - 1]?.getAttribute('data-index') ?? 0);
    expect(lastIndex).toBe(499);

    // 滚回顶部
    container.scrollTop = 0;
    container.dispatchEvent(new Event('scrollend'));
    await new Promise(r => setTimeout(r, 300));

    const itemsTop = document.querySelectorAll('.test-item');
    const firstTopIndex = Number(itemsTop[0]?.getAttribute('data-index') ?? -1);
    expect(firstTopIndex).toBe(0);
  });

});
