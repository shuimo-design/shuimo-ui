/**
 * @description headless empty 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MEmpty from '../MEmpty';

describe('MEmpty browser', () => {
  it('渲染 m-empty 根元素', async () => {
    const { container } = render(MEmpty, {
      props: { description: '暂无数据' },
    });

    expect(container.querySelector('.m-empty')).not.toBeNull();
  });

  it('渲染 m-empty-image 区域', async () => {
    const { container } = render(MEmpty, {
      props: { description: '暂无数据' },
    });

    expect(container.querySelector('.m-empty-image')).not.toBeNull();
  });

  it('description prop 渲染到 m-empty-description', async () => {
    const { container } = render(MEmpty, {
      props: { description: '没有找到数据' },
    });

    const desc = container.querySelector('.m-empty-description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toBe('没有找到数据');
  });

  it('image prop 渲染为 img 元素', async () => {
    const { container } = render(MEmpty, {
      props: { description: '无图片', image: 'https://example.com/empty.png' },
    });

    const img = container.querySelector('.m-empty-image img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toContain('example.com/empty.png');
  });

  it('image slot 优先于 image prop', async () => {
    const { container } = render(MEmpty, {
      props: { description: '无数据', image: 'https://example.com/empty.png' },
      slots: { image: () => h('span', { class: 'custom-image' }, '自定义图片') },
    });

    expect(container.querySelector('.custom-image')).not.toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });

  it('footer slot 渲染到 m-empty-footer', async () => {
    const { container } = render(MEmpty, {
      props: { description: '无数据' },
      slots: { footer: () => h('button', '重新加载') },
    });

    const footer = container.querySelector('.m-empty-footer');
    expect(footer).not.toBeNull();
    expect(footer!.querySelector('button')).not.toBeNull();
  });

  it('无 footer slot 时不渲染 m-empty-footer', async () => {
    const { container } = render(MEmpty, {
      props: { description: '无数据' },
    });

    expect(container.querySelector('.m-empty-footer')).toBeNull();
  });
});
