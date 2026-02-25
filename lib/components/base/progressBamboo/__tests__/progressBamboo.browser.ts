/**
 * @description lib progressBamboo 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MProgress from '../MProgressBamboo';

describe('MProgress (progressBamboo) browser', () => {
  it('渲染竹节进度条', async () => {
    const { container } = render(MProgress, {
      props: { value: 50, max: 100 },
    });

    expect(container.querySelector('.m-progress-bamboo')).not.toBeNull();
  });

  it('不显示 showInfo 时直接渲染 progress 元素', async () => {
    const { container } = render(MProgress, {
      props: { value: 30, max: 100, showInfo: false },
    });

    const progress = container.querySelector('.m-progress-bamboo') as HTMLProgressElement;
    expect(progress).not.toBeNull();
    expect(progress.tagName.toLowerCase()).toBe('progress');
  });

  it('显示 showInfo 时渲染外层容器', async () => {
    const { container } = render(MProgress, {
      props: { value: 60, max: 100, showInfo: true },
    });

    expect(container.querySelector('.m-progress-bamboo-border')).not.toBeNull();
    expect(container.querySelector('.m-progress-bamboo')).not.toBeNull();
  });
});
