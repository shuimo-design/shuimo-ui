/**
 * @description headless descriptions / descriptions-item 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MDescriptions from '../MDescriptions';
import MDescriptionsItem from '../MDescriptionsItem';

describe('MDescriptions browser', () => {
  it('渲染 m-descriptions 根元素', async () => {
    const { container } = render(MDescriptions, {
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    expect(container.querySelector('.m-descriptions')).not.toBeNull();
  });

  it('渲染 m-descriptions-body 内容区', async () => {
    const { container } = render(MDescriptions, {
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    expect(container.querySelector('.m-descriptions-body')).not.toBeNull();
  });

  it('title prop 渲染到 m-descriptions-header', async () => {
    const { container } = render(MDescriptions, {
      props: { title: '个人信息' },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    const header = container.querySelector('.m-descriptions-header');
    expect(header).not.toBeNull();
    expect(header!.textContent).toBe('个人信息');
  });

  it('无 title 时不渲染 m-descriptions-header', async () => {
    const { container } = render(MDescriptions, {
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    expect(container.querySelector('.m-descriptions-header')).toBeNull();
  });

  it('水平模式下渲染 m-descriptions-pair（label+value 并排）', async () => {
    const { container } = render(MDescriptions, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
          h(MDescriptionsItem, { label: '年龄' }, { default: () => '25' }),
        ],
      },
    });

    const pairs = container.querySelectorAll('.m-descriptions-pair');
    expect(pairs.length).toBe(2);
  });

  it('水平模式 label 和 value 内容正确渲染', async () => {
    const { container } = render(MDescriptions, {
      props: { direction: 'horizontal' },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '用户名' }, { default: () => 'admin' }),
        ],
      },
    });

    const label = container.querySelector('.m-descriptions-label');
    const content = container.querySelector('.m-descriptions-content');
    expect(label!.textContent).toBe('用户名');
    expect(content!.textContent).toBe('admin');
  });

  it('border=true 时有 m-descriptions-border 类', async () => {
    const { container } = render(MDescriptions, {
      props: { border: true },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    const el = container.querySelector('.m-descriptions');
    expect(el!.classList.contains('m-descriptions-border')).toBe(true);
  });

  it('默认 size=medium，有 m-descriptions-medium 类', async () => {
    const { container } = render(MDescriptions, {
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    const el = container.querySelector('.m-descriptions');
    expect(el!.classList.contains('m-descriptions-medium')).toBe(true);
  });

  it('vertical 方向有 m-descriptions-vertical 类', async () => {
    const { container } = render(MDescriptions, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
        ],
      },
    });

    const el = container.querySelector('.m-descriptions');
    expect(el!.classList.contains('m-descriptions-vertical')).toBe(true);
  });

  it('column prop 影响 grid-template-columns 样式', async () => {
    const { container } = render(MDescriptions, {
      props: { column: 2 },
      slots: {
        default: () => [
          h(MDescriptionsItem, { label: '姓名' }, { default: () => '张三' }),
          h(MDescriptionsItem, { label: '年龄' }, { default: () => '25' }),
        ],
      },
    });

    const body = container.querySelector('.m-descriptions-body') as HTMLElement;
    expect(body.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });
});
