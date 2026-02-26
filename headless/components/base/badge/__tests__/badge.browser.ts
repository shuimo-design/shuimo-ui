/**
 * @description headless badge 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MBadge from '../MBadge';

describe('MBadge browser', () => {
  it('渲染 m-badge 根元素', async () => {
    const { container } = render(MBadge, {
      props: { value: 5 },
      slots: { default: () => '子内容' },
    });

    expect(container.querySelector('.m-badge')).not.toBeNull();
  });

  it('数字 value 渲染到 m-badge-content（sup 元素）', async () => {
    const { container } = render(MBadge, {
      props: { value: 8 },
      slots: { default: () => '按钮' },
    });

    const content = container.querySelector('.m-badge-content');
    expect(content).not.toBeNull();
    expect(content!.textContent).toBe('8');
  });

  it('value 超过 max 时显示 max+', async () => {
    const { container } = render(MBadge, {
      props: { value: 200, max: 99 },
      slots: { default: () => '按钮' },
    });

    const content = container.querySelector('.m-badge-content');
    expect(content!.textContent).toBe('99+');
  });

  it('自定义 max 时超过 max 显示 max+', async () => {
    const { container } = render(MBadge, {
      props: { value: 20, max: 10 },
      slots: { default: () => '按钮' },
    });

    expect(container.querySelector('.m-badge-content')!.textContent).toBe('10+');
  });

  it('isDot=true 时渲染圆点而不是数字', async () => {
    const { container } = render(MBadge, {
      props: { isDot: true },
      slots: { default: () => '按钮' },
    });

    expect(container.querySelector('.m-badge-dot')).not.toBeNull();
    expect(container.querySelector('.m-badge-content')).toBeNull();
  });

  it('hidden=true 时不渲染徽标', async () => {
    const { container } = render(MBadge, {
      props: { value: 5, hidden: true },
      slots: { default: () => '按钮' },
    });

    expect(container.querySelector('.m-badge-content')).toBeNull();
    expect(container.querySelector('.m-badge-dot')).toBeNull();
  });

  it('默认类型 error，有 m-badge-error 类', async () => {
    const { container } = render(MBadge, {
      props: { value: 1 },
      slots: { default: () => '按钮' },
    });

    expect(container.querySelector('.m-badge-error')).not.toBeNull();
  });

  it('type=primary 时有 m-badge-primary 类', async () => {
    const { container } = render(MBadge, {
      props: { value: 1, type: 'primary' },
      slots: { default: () => '按钮' },
    });

    expect(container.querySelector('.m-badge-primary')).not.toBeNull();
  });

  it('slot 内容正确渲染到 badge 内部', async () => {
    const { container } = render(MBadge, {
      props: { value: 3 },
      slots: { default: () => '消息按钮' },
    });

    expect(container.querySelector('.m-badge')!.textContent).toContain('消息按钮');
  });
});
