/**
 * @description headless tag 浏览器测试
 * @author 阿怪
 * @date 2026/2/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MTag from '../MTag';

describe('MTag browser', () => {
  it('渲染默认 tag 并显示 slot 内容', async () => {
    const screen = render(MTag, {
      slots: { default: () => '标签文本' },
    });

    await expect.element(screen.getByText('标签文本')).toBeInTheDocument();
  });

  it('默认 type 为 default，class 包含 m-tag-default', async () => {
    const screen = render(MTag, {
      slots: { default: () => '默认标签' },
    });

    const el = screen.getByText('默认标签');
    expect(el.element().classList.contains('m-tag-default')).toBe(true);
  });

  it('设置 type=primary 时 class 正确', async () => {
    const screen = render(MTag, {
      props: { type: 'primary' },
      slots: { default: () => '主要标签' },
    });

    const el = screen.getByText('主要标签');
    expect(el.element().classList.contains('m-tag-primary')).toBe(true);
  });

  it('不包含水墨装饰 div', async () => {
    const screen = render(MTag, {
      slots: { default: () => '简洁标签' },
    });

    const el = screen.getByText('简洁标签');
    const parent = el.element();
    // headless tag 不应包含 m-tag-left / m-tag-right 装饰元素
    expect(parent.querySelector('.m-tag-left')).toBeNull();
    expect(parent.querySelector('.m-tag-right')).toBeNull();
  });
});
