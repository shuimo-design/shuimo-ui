/**
 * @description headless alert 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MAlert from '../MAlert';

describe('MAlert browser', () => {
  it('默认渲染 m-alert 元素', async () => {
    const { container } = render(MAlert, {
      props: { title: '提示信息' },
    });

    expect(container.querySelector('.m-alert')).not.toBeNull();
  });

  it('默认类型为 info，有 m-alert-info 类', async () => {
    const { container } = render(MAlert, {
      props: { title: '提示信息' },
    });

    const alert = container.querySelector('.m-alert');
    expect(alert!.classList.contains('m-alert-info')).toBe(true);
  });

  it('type=success 时有 m-alert-success 类', async () => {
    const { container } = render(MAlert, {
      props: { title: '成功', type: 'success' },
    });

    const alert = container.querySelector('.m-alert');
    expect(alert!.classList.contains('m-alert-success')).toBe(true);
  });

  it('type=error 时有 m-alert-error 类', async () => {
    const { container } = render(MAlert, {
      props: { title: '错误', type: 'error' },
    });

    const alert = container.querySelector('.m-alert');
    expect(alert!.classList.contains('m-alert-error')).toBe(true);
  });

  it('title prop 渲染到 m-alert-title', async () => {
    const { container } = render(MAlert, {
      props: { title: '这是标题' },
    });

    const titleEl = container.querySelector('.m-alert-title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('这是标题');
  });

  it('description prop 渲染到 m-alert-description', async () => {
    const { container } = render(MAlert, {
      props: { title: '标题', description: '详细描述文字' },
    });

    const desc = container.querySelector('.m-alert-description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toBe('详细描述文字');
  });

  it('closable=true 时渲染关闭按钮', async () => {
    const { container } = render(MAlert, {
      props: { title: '可关闭', closable: true },
    });

    expect(container.querySelector('.m-alert-close')).not.toBeNull();
  });

  it('closable=false 时不渲染关闭按钮', async () => {
    const { container } = render(MAlert, {
      props: { title: '不可关闭', closable: false },
    });

    expect(container.querySelector('.m-alert-close')).toBeNull();
  });

  it('点击关闭按钮后 alert 消失并触发 close 事件', async () => {
    const onClose = vi.fn();
    const { container } = render(MAlert, {
      props: { title: '可关闭', closable: true, onClose },
    });

    const closeBtn = container.querySelector('.m-alert-close') as HTMLElement;
    closeBtn.click();
    await nextTick();

    expect(onClose).toHaveBeenCalledOnce();
    expect(container.querySelector('.m-alert')).toBeNull();
  });

  it('showIcon=true 时渲染图标区域', async () => {
    const { container } = render(MAlert, {
      props: { title: '带图标', showIcon: true },
    });

    expect(container.querySelector('.m-alert-icon')).not.toBeNull();
  });

  it('default slot 作为描述内容渲染', async () => {
    const { container } = render(MAlert, {
      props: { title: '标题' },
      slots: { default: () => '插槽描述文字' },
    });

    const desc = container.querySelector('.m-alert-description');
    expect(desc!.textContent).toContain('插槽描述文字');
  });
});
