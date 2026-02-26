/**
 * @description headless card 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MCard from '../MCard';

describe('MCard browser', () => {
  it('渲染 m-card 根元素', async () => {
    const { container } = render(MCard, {
      slots: { default: () => '卡片内容' },
    });

    expect(container.querySelector('.m-card')).not.toBeNull();
  });

  it('默认渲染 m-card-body 并包含 slot 内容', async () => {
    const { container } = render(MCard, {
      slots: { default: () => '卡片主体内容' },
    });

    const body = container.querySelector('.m-card-body');
    expect(body).not.toBeNull();
    expect(body!.textContent).toContain('卡片主体内容');
  });

  it('无 title/header 时不渲染 m-card-header', async () => {
    const { container } = render(MCard, {
      slots: { default: () => '卡片内容' },
    });

    expect(container.querySelector('.m-card-header')).toBeNull();
  });

  it('传入 title prop 时渲染 m-card-header', async () => {
    const { container } = render(MCard, {
      props: { title: '卡片标题' },
      slots: { default: () => '卡片内容' },
    });

    const header = container.querySelector('.m-card-header');
    expect(header).not.toBeNull();
    expect(header!.textContent).toBe('卡片标题');
  });

  it('header slot 优先于 title prop', async () => {
    const { container } = render(MCard, {
      props: { title: '被覆盖的标题' },
      slots: {
        header: () => '自定义头部',
        default: () => '卡片内容',
      },
    });

    const header = container.querySelector('.m-card-header');
    expect(header!.textContent).toBe('自定义头部');
    expect(header!.textContent).not.toContain('被覆盖的标题');
  });

  it('shadow prop 附加 m-card-shadow-{type} 类名', async () => {
    const { container } = render(MCard, {
      props: { shadow: 'always' },
      slots: { default: () => '内容' },
    });

    const card = container.querySelector('.m-card');
    expect(card!.classList.contains('m-card-shadow-always')).toBe(true);
  });

  it('bodyStyle prop 作用到 m-card-body 内联样式', async () => {
    const { container } = render(MCard, {
      props: { bodyStyle: { padding: '20px' } },
      slots: { default: () => '内容' },
    });

    const body = container.querySelector('.m-card-body') as HTMLElement;
    expect(body.style.padding).toBe('20px');
  });
});
