/**
 * @description headless Progress 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MProgress from '../MProgress';

describe('MProgress browser', () => {
  it('渲染容器包含 m-progress 类名', () => {
    const { container } = render(MProgress, {
      props: { value: 0, max: 100 },
    });

    const el = container.querySelector('.m-progress');
    expect(el).not.toBeNull();
  });

  it('渲染 progress 原生元素并包含 m-progress-main 类名', () => {
    const { container } = render(MProgress, {
      props: { value: 50, max: 100 },
    });

    const progress = container.querySelector('progress.m-progress-main') as HTMLProgressElement;
    expect(progress).not.toBeNull();
  });

  it('progress 元素的 value 和 max 属性正确传递', () => {
    const { container } = render(MProgress, {
      props: { value: 30, max: 200 },
    });

    const progress = container.querySelector('progress.m-progress-main') as HTMLProgressElement;
    expect(progress.value).toBe(30);
    expect(progress.max).toBe(200);
  });

  it('showInfo 为 true 时渲染百分比文字 m-progress-per', () => {
    const { container } = render(MProgress, {
      props: { value: 50, max: 100, showInfo: true },
    });

    const per = container.querySelector('.m-progress-per');
    expect(per).not.toBeNull();
    expect(per!.textContent).toBe('50%');
  });

  it('showInfo 为 false 时不渲染百分比文字', () => {
    const { container } = render(MProgress, {
      props: { value: 50, max: 100, showInfo: false },
    });

    const per = container.querySelector('.m-progress-per');
    expect(per).toBeNull();
  });

  it('传入默认插槽时渲染 m-progress-info 包裹插槽内容', () => {
    const { container } = render(MProgress, {
      props: { value: 60, max: 100 },
      slots: { default: () => '加载中...' },
    });

    const info = container.querySelector('.m-progress-info');
    expect(info).not.toBeNull();
    expect(info!.textContent).toBe('加载中...');
    // 插槽优先，不渲染 m-progress-per
    const per = container.querySelector('.m-progress-per');
    expect(per).toBeNull();
  });

  it('百分比计算正确（非整数情况）', () => {
    const { container } = render(MProgress, {
      props: { value: 1, max: 3, showInfo: true },
    });

    const per = container.querySelector('.m-progress-per');
    expect(per).not.toBeNull();
    // 1/3*100 = 33.33...，保留两位小数
    expect(per!.textContent).toBe('33.33%');
  });

  it('value 为 0 时百分比显示 0%', () => {
    const { container } = render(MProgress, {
      props: { value: 0, max: 100, showInfo: true },
    });

    const per = container.querySelector('.m-progress-per');
    expect(per).not.toBeNull();
    expect(per!.textContent).toBe('0%');
  });
});
