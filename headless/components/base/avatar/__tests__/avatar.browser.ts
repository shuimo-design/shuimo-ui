/**
 * @description headless Avatar 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MAvatar from '../MAvatar';

describe('MAvatar browser', () => {
  it('默认渲染包含 m-avatar 类名', () => {
    const { container } = render(MAvatar, {});

    const el = container.querySelector('.m-avatar');
    expect(el).not.toBeNull();
  });

  it('默认 variant 为 circle，size 为 default', () => {
    const { container } = render(MAvatar, {});

    const el = container.querySelector('.m-avatar');
    expect(el!.classList.contains('m-avatar-circle')).toBe(true);
    expect(el!.classList.contains('m-avatar-default')).toBe(true);
  });

  it('variant 为 square 时渲染 m-avatar-square 类名', () => {
    const { container } = render(MAvatar, {
      props: { variant: 'square' },
    });

    const el = container.querySelector('.m-avatar');
    expect(el!.classList.contains('m-avatar-square')).toBe(true);
  });

  it('size 为 large 时渲染 m-avatar-large 类名', () => {
    const { container } = render(MAvatar, {
      props: { size: 'large' },
    });

    const el = container.querySelector('.m-avatar');
    expect(el!.classList.contains('m-avatar-large')).toBe(true);
  });

  it('size 为 small 时渲染 m-avatar-small 类名', () => {
    const { container } = render(MAvatar, {
      props: { size: 'small' },
    });

    const el = container.querySelector('.m-avatar');
    expect(el!.classList.contains('m-avatar-small')).toBe(true);
  });

  it('传入 img 时渲染 img 标签', () => {
    const { container } = render(MAvatar, {
      props: { img: 'https://example.com/avatar.png' },
    });

    const img = container.querySelector('.m-avatar img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img.src).toBe('https://example.com/avatar.png');
  });

  it('未传入 img 时渲染默认插槽内容', () => {
    const { container } = render(MAvatar, {
      slots: { default: () => '阿' },
    });

    const el = container.querySelector('.m-avatar');
    expect(el).not.toBeNull();
    expect(el!.querySelector('img')).toBeNull();
    expect(el!.textContent).toBe('阿');
  });

  it('传入 img 时忽略默认插槽', () => {
    const { container } = render(MAvatar, {
      props: { img: 'https://example.com/avatar.png' },
      slots: { default: () => '文字头像' },
    });

    const img = container.querySelector('.m-avatar img');
    expect(img).not.toBeNull();
    // img 模式下不渲染插槽文字
    const el = container.querySelector('.m-avatar');
    expect(el!.textContent).toBe('');
  });
});
