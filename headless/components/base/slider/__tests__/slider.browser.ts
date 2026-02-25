/**
 * @description headless Slider 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';
import MSlider from '../MSlider';

describe('MSlider browser', () => {
  it('默认渲染包含 slider 结构', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0 },
    });

    const el = container.querySelector('.m-slider');
    expect(el).not.toBeNull();
    expect(el!.querySelector('.m-slider-wrapper')).not.toBeNull();
    expect(el!.querySelector('.m-slider-runway')).not.toBeNull();
    expect(el!.querySelector('.m-slider-button')).not.toBeNull();
  });

  it('showInfo 为 false 时不渲染信息区域', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0, showInfo: false },
    });

    expect(container.querySelector('.m-slider-info')).toBeNull();
  });

  it('showInfo 为 true 时渲染信息区域', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0, showInfo: true, min: 0, max: 100 },
    });

    const info = container.querySelector('.m-slider-info');
    expect(info).not.toBeNull();
    expect(info!.querySelector('.m-slider-min')).not.toBeNull();
    expect(info!.querySelector('.m-slider-max')).not.toBeNull();
  });

  it('showInfo 区域显示正确的 min/max 值', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0, showInfo: true, min: 10, max: 200 },
    });

    const minEl = container.querySelector('.m-slider-min');
    const maxEl = container.querySelector('.m-slider-max');
    expect(minEl!.textContent).toBe('10');
    expect(maxEl!.textContent).toBe('200');
  });

  it('初始值为 50 时百分比信息正确渲染', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 50, showInfo: true, min: 0, max: 100 },
    });

    await nextTick();

    const info = container.querySelector('.m-slider-info');
    expect(info).not.toBeNull();
    // 信息区域有三个子元素：min、百分比、max
    const children = info!.querySelectorAll('div');
    expect(children.length).toBe(3);
  });

  it('runway 宽度初始状态为 0%（未挂载实际宽度时）', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0, min: 0, max: 100 },
    });

    await nextTick();

    const runway = container.querySelector('.m-slider-runway') as HTMLElement;
    expect(runway).not.toBeNull();
    // 初始 perRef 为 0，runway width 应为 0%
    expect(runway.style.width).toBe('0%');
  });
});
